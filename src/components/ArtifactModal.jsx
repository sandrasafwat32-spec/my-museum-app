import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

function ArtifactModal({ artifact, onClose }) {
  if (!artifact) return null;

  const mountRef = useRef(null);
  const animFrameRef = useRef(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a1a1a);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0.5, 3);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);
    const dirLight = new THREE.DirectionalLight(0xffd59e, 2);
    dirLight.position.set(2, 4, 3);
    scene.add(dirLight);

    const loader = new GLTFLoader();
    let model = null;
    const modelPath = artifact.model || `/models/akhenaten.glb`;

    loader.load(modelPath, (gltf) => {
      model = gltf.scene;
      const box = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      const scale = 2 / Math.max(size.x, size.y, size.z);
      model.scale.setScalar(scale);
      model.position.sub(center.multiplyScalar(scale));
      scene.add(model);
    });

    let t = 0;
    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);
      t += 0.016;
      if (model) {
        // 🔄 Subtle rotation (existing)
        model.rotation.y = Math.sin(t * 0.4) * 0.06;
        model.rotation.x = Math.sin(t * 0.3) * 0.02;

        // 💨 Breathing effect - scale يكبر ويصغر بشكل خفيف جداً
        const breath = 1 + Math.sin(t * 1.2) * 0.012;
        model.scale.setScalar((2 / model.userData.originalSize || 1) * breath);
      }
      renderer.render(scene, camera);
    };

    // نحفظ الـ original scale عشان الـ breathing يبقى صح
    loader.load(modelPath, (gltf) => {
      model = gltf.scene;
      const box = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      const maxSize = Math.max(size.x, size.y, size.z);
      const baseScale = 2 / maxSize;
      model.scale.setScalar(baseScale);
      model.position.sub(center.multiplyScalar(baseScale));
      model.userData.baseScale = baseScale; // نحفظ الـ base scale
      scene.add(model);
    });

    let t2 = 0;
    const animate2 = () => {
      animFrameRef.current = requestAnimationFrame(animate2);
      t2 += 0.016;
      if (model) {
        model.rotation.y = Math.sin(t2 * 0.4) * 0.06;
        model.rotation.x = Math.sin(t2 * 0.3) * 0.02;

        // 💨 Breathing
        const breath = 1 + Math.sin(t2 * 1.2) * 0.012;
        const base = model.userData.baseScale || 1;
        model.scale.setScalar(base * breath);
      }
      renderer.render(scene, camera);
    };

    animate2();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [artifact]);

  // 🔊 Text-to-Speech function
  const handleSpeak = () => {
    if (!window.speechSynthesis) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const text = artifact.description || artifact.name;
    const utterance = new SpeechSynthesisUtterance(text);

    // اختار صوت إنجليزي أو عربي حسب النص
    const voices = window.speechSynthesis.getVoices();
    const arabicVoice = voices.find(v => v.lang.startsWith("ar"));
    const englishVoice = voices.find(v => v.lang.startsWith("en"));
    utterance.voice = arabicVoice || englishVoice || voices[0];
    utterance.rate = 0.85;
    utterance.pitch = 0.9;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  // إوقف الصوت لو المودال اتقفل
  useEffect(() => {
    return () => {
      window.speechSynthesis?.cancel();
    };
  }, []);

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: "rgba(0,0,0,0.85)",
      display: "flex", justifyContent: "center", alignItems: "center",
      zIndex: 1000,
    }}>
      <div style={{
        background: "#111", borderRadius: "16px",
        maxWidth: "600px", width: "95%", padding: "20px",
        color: "#fff", position: "relative",
      }}>
        <button onClick={onClose} style={{
          position: "absolute", top: "12px", right: "16px",
          background: "transparent", border: "none",
          color: "#fff", fontSize: "22px", cursor: "pointer",
        }}>✕</button>

        <h2 style={{ marginTop: 0 }}>{artifact.name}</h2>

        <div ref={mountRef} style={{
          width: "100%", height: "340px",
          borderRadius: "12px", overflow: "hidden",
        }} />

        <p style={{ fontSize: "14px", color: "#ccc", marginTop: "12px" }}>
          {artifact.description}
        </p>

        {/* 🔊 زرار الكلام */}
        <button
          onClick={handleSpeak}
          style={{
            marginTop: "10px",
            padding: "10px 20px",
            background: isSpeaking
              ? "linear-gradient(135deg, #c0392b, #e74c3c)"
              : "linear-gradient(135deg, #b8860b, #d4a017)",
            border: "none",
            borderRadius: "8px",
            color: "#fff",
            fontSize: "15px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            transition: "all 0.3s ease",
          }}
        >
          {isSpeaking ? "⏹ إيقاف الصوت" : "🔊 استمع للتمثال"}
        </button>

        {artifact.audio && (
          <audio controls style={{ width: "100%", marginTop: "8px" }}>
            <source src={artifact.audio} type="audio/mpeg" />
          </audio>
        )}
      </div>
    </div>
  );
}

export default ArtifactModal;
