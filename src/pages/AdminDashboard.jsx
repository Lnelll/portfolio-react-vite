import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const [kategori, setKategori] = useState("PKL");
  const [deskripsi, setDeskripsi] = useState("");
  const [gambarBase64, setGambarBase64] = useState(null); // State untuk menyimpan foto
  const navigate = useNavigate();

  const [daftarPengalaman, setDaftarPengalaman] = useState(() => {
    const dataLokal = localStorage.getItem("dataPengalaman");
    return dataLokal ? JSON.parse(dataLokal) : [];
  });

  useEffect(() => {
    localStorage.setItem("dataPengalaman", JSON.stringify(daftarPengalaman));
  }, [daftarPengalaman]);

  // Fungsi memproses konversi file gambar
  const handleUploadFoto = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Batasi ukuran file opsional untuk menghindari Local Storage penuh (limit ~5MB)
      if (file.size > 2000000) {
        alert("Ukuran gambar terlalu besar! Maksimal 2MB.");
        e.target.value = null;
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setGambarBase64(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  function tambahPengalaman(e) {
    e.preventDefault();
    if (deskripsi.trim() === "") {
      alert("Deskripsi pengalaman tidak boleh kosong!");
      return;
    }
    // Menyimpan data dengan properti gambar tambahan
    const pengalamanBaru = { id: Date.now(), kategori, deskripsi, gambar: gambarBase64 };
    setDaftarPengalaman([...daftarPengalaman, pengalamanBaru]);
    setDeskripsi("");
    setGambarBase64(null); // Reset state gambar
  }

  function hapusPengalaman(id) {
    const dataTerbaru = daftarPengalaman.filter((item) => item.id !== id);
    setDaftarPengalaman(dataTerbaru);
  }

  function handleLogout() {
    localStorage.removeItem("isAdminLoggedIn");
    navigate("/");
  }

  return (
    <div className="container">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
        <h1>Panel Admin</h1>
        <button onClick={handleLogout} className="btn-danger">Logout</button>
      </div>

      <div className="card" style={{ marginBottom: '40px' }}>
        <h2>Tambah Data Baru</h2>
        <form onSubmit={tambahPengalaman} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <select value={kategori} onChange={(e) => setKategori(e.target.value)}>
            <option value="PKL">PKL</option>
            <option value="Freelance">Freelance</option>
            <option value="Lomba">Lomba</option>
            <option value="Ekstrakurikuler">Ekstrakurikuler</option>
            <option value="Project">Project</option>
          </select>
          <textarea 
            placeholder="Deskripsi pengalaman atau spesifikasi project..." 
            value={deskripsi} 
            onChange={(e) => setDeskripsi(e.target.value)} 
            rows="4" 
          />
          
          {/* Input Upload Foto (Opsional) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '0.9rem', color: '#94a3b8' }}>Dokumentasi (Opsional - Maks 2MB):</label>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleUploadFoto}
              style={{ padding: '8px', backgroundColor: 'transparent' }}
            />
          </div>

          <button type="submit" style={{ alignSelf: 'flex-start', marginTop: '10px' }}>Simpan Pengalaman</button>
        </form>
      </div>

      <div>
        <h2>Kelola Data Saat Ini</h2>
        {daftarPengalaman.length === 0 ? (
          <p>Belum ada data pengalaman yang tersimpan.</p>
        ) : (
          <div className="card-container" style={{ gridTemplateColumns: '1fr', gap: '16px' }}>
            {daftarPengalaman.map((item) => (
              <div key={item.id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ width: '80%' }}>
                  <span className="badge">{item.kategori}</span>
                  <p style={{ color: '#e2e8f0', marginTop: '8px' }}>{item.deskripsi}</p>
                  
                  {/* Pratinjau Gambar di Admin */}
                  {item.gambar && (
                    <img 
                      src={item.gambar} 
                      alt="Dokumentasi" 
                      style={{ width: '150px', height: '100px', objectFit: 'cover', borderRadius: '8px', marginTop: '10px', border: '1px solid rgba(255,255,255,0.1)' }} 
                    />
                  )}
                </div>
                <button onClick={() => hapusPengalaman(item.id)} className="btn-danger">Hapus</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;