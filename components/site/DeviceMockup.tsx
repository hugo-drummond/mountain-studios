export default function DeviceMockup({ src, alt }: { src: string; alt: string }) {
  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '560px', margin: '0 auto' }}>
      <div style={{
        background: '#1a1a2e',
        borderRadius: '14px',
        padding: '0.6rem 0.6rem 0',
        boxShadow: '0 40px 70px -30px rgba(23,27,43,0.55)',
        transform: 'perspective(1400px) rotateX(2deg)',
      }}>
        <div style={{
          display: 'flex',
          gap: '5px',
          padding: '0 0.35rem 0.5rem',
        }}>
          <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'rgba(255,255,255,0.25)' }} />
          <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'rgba(255,255,255,0.25)' }} />
          <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'rgba(255,255,255,0.25)' }} />
        </div>
        <div style={{
          background: '#f4f2fa',
          borderRadius: '6px 6px 0 0',
          overflow: 'hidden',
          aspectRatio: '16/10',
        }}>
          <img
            src={src}
            alt={alt}
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block' }}
          />
        </div>
      </div>
      {/* base */}
      <div style={{
        height: '14px',
        margin: '0 -1.5rem',
        background: 'linear-gradient(180deg, #1a1a2e 0%, #0f1120 100%)',
        borderRadius: '0 0 10px 10px',
        boxShadow: '0 14px 24px -14px rgba(23,27,43,0.5)',
      }} />
      <div style={{
        height: '5px',
        width: '35%',
        margin: '0 auto',
        background: '#0f1120',
        borderRadius: '0 0 6px 6px',
      }} />
    </div>
  )
}
