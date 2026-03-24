export default function ArtifactCard({ artifact }) {
  return (
    <>
      <style>{`
        .artifact-card {
          width: 100%;
          aspect-ratio: 3/4;
          border-radius: 16px;
          overflow: hidden;
          position: relative;
          cursor: pointer;
          background: #111;
          border: 1px solid rgba(212,175,90,0.1);
          transition: transform 0.45s cubic-bezier(0.175,0.885,0.32,1.275), border-color 0.3s, box-shadow 0.4s;
        }
        .artifact-card:hover {
          transform: translateY(-12px) scale(1.02);
          border-color: rgba(212,175,90,0.45);
          box-shadow: 0 30px 60px rgba(0,0,0,0.7), 0 0 30px rgba(212,175,90,0.1);
        }
        .artifact-card::before {
          content: '';
          position: absolute;
          top: 12px; left: 12px;
          width: 20px; height: 20px;
          border-top: 1.5px solid rgba(212,175,90,0.5);
          border-left: 1.5px solid rgba(212,175,90,0.5);
          z-index: 2; opacity: 0;
          transition: opacity 0.3s;
          pointer-events: none;
        }
        .artifact-card::after {
          content: '';
          position: absolute;
          bottom: 12px; right: 12px;
          width: 20px; height: 20px;
          border-bottom: 1.5px solid rgba(212,175,90,0.5);
          border-right: 1.5px solid rgba(212,175,90,0.5);
          z-index: 2; opacity: 0;
          transition: opacity 0.3s;
          pointer-events: none;
        }
        .artifact-card:hover::before,
        .artifact-card:hover::after { opacity: 1; }
        .card-img {
          width: 100%; height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }
        .artifact-card:hover .card-img { transform: scale(1.08); }
        .card-overlay {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 60%;
          background: linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.5) 50%, transparent 100%);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 20px;
        }
        .card-era {
          font-family: 'Lato', sans-serif;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #d4af5a;
          margin-bottom: 5px;
        }
        .card-name {
          font-family: 'Cinzel', serif;
          font-size: 1rem;
          font-weight: 600;
          color: white;
          line-height: 1.3;
        }
        .card-line {
          width: 32px; height: 1.5px;
          background: linear-gradient(to right, #d4af5a, transparent);
          margin-top: 10px;
        }
      `}</style>

      <div className="artifact-card">
        <img className="card-img" src={artifact.image} alt={artifact.name} />
        <div className="card-overlay">
          <div className="card-era">{artifact.kingdom}</div>
          <div className="card-name">{artifact.name}</div>
          <div className="card-line"></div>
        </div>
      </div>
    </>
  );
}