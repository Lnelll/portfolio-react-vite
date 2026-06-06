function About() {
  return (
    <div className="container">
      <h1>Tentang Saya</h1>
      
      <div className="card-container" style={{ gridTemplateColumns: '1fr' }}>
        <div className="card">
          <h2>Latar Belakang</h2>
          <p>
            Saya adalah pengembang yang berfokus pada integrasi logika sistem dan antarmuka interaktif. 
            Berpengalaman membangun aplikasi web modern menggunakan React dan ekosistem JavaScript, 
            serta memiliki minat kuat dalam eksplorasi mekanik game interaktif dan desain 2D.
          </p>
        </div>

        <div className="card">
          <h2>Kontak & Sosial Media</h2>
          <ul style={{ listStyle: 'none', paddingLeft: '0', color: '#94a3b8', marginTop: '10px' }}>
            <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <strong style={{ color: '#e2e8f0' }}>WhatsApp:</strong> 
              <a href="https://wa.me/6288888888888" target="_blank" rel="noreferrer" style={{ color: '#38bdf8', textDecoration: 'none' }}>0888-8888-8888</a>
            </li>
            <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <strong style={{ color: '#e2e8f0' }}>Instagram:</strong> 
              <a href="https://instagram.com/kkaaz___" target="_blank" rel="noreferrer" style={{ color: '#38bdf8', textDecoration: 'none' }}>@kkaaz___</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default About;