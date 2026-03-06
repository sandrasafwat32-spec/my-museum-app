import React from "react";

function ArtifactModal({ artifact, onClose }) {
  if (!artifact) return null;

  return (
    <div className="modal" style={{
        position: "fixed",
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: "rgba(0,0,0,0.10)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}>
      <div style={{background: "#fff", padding: "20px", borderRadius: "10px", maxWidth: "500px"}}>
        <button onClick={onClose} style={{float:"right"}}>X</button>
        <h2>{artifact.name}</h2>
        <img src={artifact.image} alt={artifact.name} width="300" />
        <p>{artifact.description}</p>
        <audio controls>
          <source src={artifact.audio} type="audio/mpeg" />
        </audio>
      </div>
    </div>
  );
}

export default ArtifactModal;