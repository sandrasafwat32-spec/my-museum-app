import { useState } from "react";
import emailjs from "emailjs-com";

export default function Contact() {
  const [sending, setSending] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setSending(true);
    emailjs
      .sendForm("service_hh1i6f9", "template_quyijwd", e.target, "OSIsRWaopIaFrXV16")
      .then(
        () => { alert("Your message sent successfully! ✨"); e.target.reset(); setSending(false); },
        () => { alert("Failed to send your message, please try again later. ❌"); setSending(false); }
      );
  };

  const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Lato:wght@300;400;700&display=swap');

    .contact-page {
      width: 100%;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 120px 20px 60px;
      box-sizing: border-box;
    }

    .contact-box {
      width: 100%;
      max-width: 550px;
      padding: 50px 40px;
      background-color: rgba(0, 0, 0, 0.75);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-radius: 28px;
      border: 1px solid rgba(255, 215, 0, 0.3);
      box-shadow: 0 25px 50px rgba(0,0,0,0.6), inset 0 0 15px rgba(255,215,0,0.05);
      display: flex;
      flex-direction: column;
      gap: 25px;
      text-align: center;
      box-sizing: border-box;
    }

    .contact-title {
      font-family: 'Cinzel', serif;
      font-size: 2.5rem;
      font-weight: 700;
      color: gold;
      margin: 0 0 10px;
      letter-spacing: 2px;
      text-transform: uppercase;
      text-shadow: 0 4px 10px rgba(0,0,0,0.5);
    }

    .contact-subtitle {
      color: rgba(255,255,255,0.6);
      font-family: 'Lato', sans-serif;
      font-size: 0.9rem;
      margin-bottom: 20px;
      letter-spacing: 1px;
    }

    .contact-form {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .input-group {
      display: flex;
      flex-direction: column;
      text-align: left;
      gap: 8px;
    }

    .input-label {
      color: gold;
      font-family: 'Lato', sans-serif;
      font-size: 0.8rem;
      font-weight: 700;
      margin-left: 5px;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .contact-input {
      padding: 16px 20px;
      border-radius: 14px;
      border: 1px solid rgba(255,255,255,0.1);
      background-color: rgba(255,255,255,0.03);
      color: #fff;
      outline: none;
      font-size: 1rem;
      font-family: 'Lato', sans-serif;
      transition: border 0.3s ease;
      width: 100%;
      box-sizing: border-box;
    }

    .contact-input:focus {
      border: 1px solid gold;
    }

    .contact-input::placeholder {
      color: rgba(255,255,255,0.3);
    }

    .contact-btn {
      margin-top: 15px;
      padding: 16px;
      border-radius: 50px;
      border: 1px solid gold;
      cursor: pointer;
      background-color: transparent;
      color: gold;
      font-family: 'Cinzel', serif;
      font-weight: 600;
      font-size: 1rem;
      text-transform: uppercase;
      letter-spacing: 3px;
      transition: all 0.4s ease;
      width: 100%;
    }

    .contact-btn:hover {
      background-color: gold;
      color: black;
      box-shadow: 0 0 25px rgba(255,215,0,0.4);
    }

    /* Mobile fixes */
    @media (max-width: 480px) {
      .contact-box {
        padding: 36px 20px;
        border-radius: 20px;
      }

      .contact-title {
        font-size: 1.8rem;
        letter-spacing: 1px;
      }

      .contact-input {
        font-size: 16px; /* منع zoom على iOS */
        padding: 14px 16px;
      }

      .contact-btn {
        font-size: 0.85rem;
        letter-spacing: 2px;
        padding: 14px;
      }
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <div className="contact-page">
        <div className="contact-box">
          <h1 className="contact-title">Contact Us</h1>
          <p className="contact-subtitle">Reach out to the keepers of history</p>

          <form className="contact-form" onSubmit={sendEmail}>
            <div className="input-group">
              <label className="input-label">Full Name</label>
              <input type="text" name="user_name" placeholder="Enter your name" required className="contact-input" />
            </div>

            <div className="input-group">
              <label className="input-label">Email Address</label>
              <input type="email" name="user_email" placeholder="Enter your email" required className="contact-input" />
            </div>

            <div className="input-group">
              <label className="input-label">Message</label>
              <textarea name="message" placeholder="Write your message here..." rows="4" required className="contact-input" style={{resize:"none"}}></textarea>
            </div>

            <button type="submit" className="contact-btn">
              {sending ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}