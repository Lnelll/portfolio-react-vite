import { motion } from "framer-motion";
import profileImg from "../assets/LO.jpeg";

function Home() {
  return (
    <motion.div 
      className="container" 
      style={{ textAlign: 'center' }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.img 
        src={profileImg} 
        alt="Profile" 
        style={{ 
          width: '180px', 
          height: '180px', 
          objectFit: 'cover', 
          borderRadius: '50%', 
          marginBottom: '20px', 
          border: '4px solid rgba(56, 189, 248, 0.3)' 
        }}
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: "spring", stiffness: 300 }}
      />
      <h1>Halo, saya Lionel Okka P.</h1>
      <h2 style={{ color: '#38bdf8' }}>Web Developer & Mahasiswa</h2>
      <p style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}>
        Selamat datang di portofolio digital saya. Saya memiliki minat dalam pengembangan aplikasi web dan terus berfokus pada peningkatan keahlian logika pemrograman serta desain antarmuka.
      </p>
    </motion.div>
  );
}

export default Home;