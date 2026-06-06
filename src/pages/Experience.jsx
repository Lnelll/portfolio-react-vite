import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Import gambar dari folder assets
import imgCode from "../assets/code.jpg";
import imgGame from "../assets/game.png";

function Experience() {
  const [daftarPengalaman, setDaftarPengalaman] = useState(() => {
    const dataLokal = localStorage.getItem("dataPengalaman");
    const dataParsed = dataLokal ? JSON.parse(dataLokal) : [];
    
    // Jika data kosong, gunakan data awal dengan referensi gambar yang diimport
    if (dataParsed.length === 0) {
      const dataAwal = [
        { 
          id: 1, 
          kategori: "PROJECT", 
          deskripsi: "code login",
          gambar: imgCode 
        },
        { 
          id: 2, 
          kategori: "PROJECT", 
          deskripsi: "game rpg puzzle",
          gambar: imgGame
        }
      ];
      localStorage.setItem("dataPengalaman", JSON.stringify(dataAwal));
      return dataAwal;
    }
    
    return dataParsed;
  });

  useEffect(() => {
    localStorage.setItem("dataPengalaman", JSON.stringify(daftarPengalaman));
  }, [daftarPengalaman]);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.div 
      className="container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '16px' }}>
        Riwayat Pengalaman
      </h1>

      <div style={{ marginTop: '40px' }}>
        <h2 style={{ color: '#38bdf8' }}>Portofolio Proyek</h2>
        {daftarPengalaman.length === 0 ? (
          <p>Belum ada data pengalaman yang dipublikasikan.</p>
        ) : (
          <motion.div className="card-container" variants={containerVariants} initial="hidden" animate="show">
            {daftarPengalaman.map((item) => (
              <motion.div key={item.id} className="card" variants={itemVariants}>
                <span className="badge">{item.kategori}</span>
                <p style={{ marginTop: '12px', color: '#e2e8f0', marginBottom: '15px' }}>{item.deskripsi}</p>
                
                {item.gambar && (
                  <img 
                    src={item.gambar} 
                    alt="Dokumentasi Project" 
                    style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }} 
                  />
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export default Experience;