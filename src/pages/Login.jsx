import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Referensi DOM untuk animasi
  const cardRef = useRef(null);
  const leverRef = useRef(null);
  const statusRef = useRef(null);
  const loginViewRef = useRef(null);
  const welcomeViewRef = useRef(null);
  const userRef = useRef(null);
  const passRef = useRef(null);
  const steamRef = useRef(null);
  const audioCtxRef = useRef(null);

  const [busy, setBusy] = useState(false);

  // Inisialisasi Audio Engine
  const getAudioCtx = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  const playClick = () => {
    const ctx = getAudioCtx();
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.35, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
    const o = ctx.createOscillator();
    o.type = "square";
    o.frequency.setValueAtTime(180, ctx.currentTime);
    o.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.08);
    o.connect(g);
    g.connect(ctx.destination);
    o.start();
    o.stop(ctx.currentTime + 0.09);
  };

  const playHum = () => {
    const ctx = getAudioCtx();
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, ctx.currentTime);
    g.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.1);
    g.gain.setValueAtTime(0.15, ctx.currentTime + 0.45);
    g.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.55);
    const o = ctx.createOscillator();
    o.type = "sawtooth";
    o.frequency.setValueAtTime(60, ctx.currentTime);
    const f = ctx.createBiquadFilter();
    f.type = "lowpass";
    f.frequency.value = 300;
    o.connect(f);
    f.connect(g);
    g.connect(ctx.destination);
    o.start();
    o.stop(ctx.currentTime + 0.6);
  };

  const playPop = () => {
    const ctx = getAudioCtx();
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.5, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
    const o = ctx.createOscillator();
    o.type = "sine";
    o.frequency.setValueAtTime(120, ctx.currentTime);
    o.frequency.exponentialRampToValueAtTime(480, ctx.currentTime + 0.08);
    o.frequency.exponentialRampToValueAtTime(260, ctx.currentTime + 0.35);
    o.connect(g);
    g.connect(ctx.destination);
    o.start();
    o.stop(ctx.currentTime + 0.36);

    setTimeout(() => {
      const g2 = ctx.createGain();
      g2.gain.setValueAtTime(0.3, ctx.currentTime);
      g2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
      const o2 = ctx.createOscillator();
      o2.type = "sine";
      o2.frequency.setValueAtTime(880, ctx.currentTime);
      o2.frequency.setValueAtTime(1100, ctx.currentTime + 0.05);
      o2.connect(g2);
      g2.connect(ctx.destination);
      o2.start();
      o2.stop(ctx.currentTime + 0.65);
    }, 90);
  };

  const playError = () => {
    const ctx = getAudioCtx();
    [0, 0.12].forEach((d) => {
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.25, ctx.currentTime + d);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + d + 0.1);
      const o = ctx.createOscillator();
      o.type = "square";
      o.frequency.setValueAtTime(220, ctx.currentTime + d);
      o.connect(g);
      g.connect(ctx.destination);
      o.start(ctx.currentTime + d);
      o.stop(ctx.currentTime + d + 0.11);
    });
  };

  const triggerSteam = () => {
    if (!steamRef.current) return;
    const particles = steamRef.current.querySelectorAll(".sp");
    particles.forEach((p) => {
      p.classList.remove("go");
      void p.offsetWidth;
      p.classList.add("go");
    });
  };

  const handlePullLever = () => {
    if (busy) return;
    getAudioCtx();

    const validUser = import.meta.env.VITE_ADMIN_USER;
    const validPass = import.meta.env.VITE_ADMIN_PASS;

    // Validasi login
    if (!username || !password || username !== validUser || password !== validPass) {
      playError();
      if (!username || username !== validUser) {
        userRef.current.classList.add("error");
        setTimeout(() => userRef.current?.classList.remove("error"), 450);
      }
      if (!password || password !== validPass) {
        passRef.current.classList.add("error");
        setTimeout(() => passRef.current?.classList.remove("error"), 450);
      }
      statusRef.current.textContent = "⚠ Kredensial tidak valid!";
      statusRef.current.className = "status err";
      leverRef.current.classList.add("pulled");
      setTimeout(() => leverRef.current?.classList.remove("pulled"), 320);
      return;
    }

    // Jika berhasil
    setBusy(true);
    statusRef.current.textContent = "";
    playClick();
    leverRef.current.classList.add("pulled");
    cardRef.current.classList.add("sink");
    playHum();

    setTimeout(() => {
      loginViewRef.current.style.display = "none";
      welcomeViewRef.current.style.display = "flex";
      const ic = welcomeViewRef.current.querySelector(".w-icon");
      if (ic) {
        ic.style.animation = "none";
        void ic.offsetWidth;
        ic.style.animation = "";
      }

      cardRef.current.classList.remove("sink");
      setTimeout(() => {
        cardRef.current.classList.add("pop");
        leverRef.current.classList.remove("pulled");
        playPop();
        triggerSteam();
        statusRef.current.textContent = "✓ Akses Diterima!";
        statusRef.current.className = "status ok";

        // Arahkan ke dashboard admin setelah animasi selesai
        setTimeout(() => {
          localStorage.setItem("isAdminLoggedIn", "true");
          navigate("/admin");
        }, 2000);
      }, 90);
    }, 540);
  };

  return (
    <div className="toaster-scene">
      <div className="top-label"><span>Akses</span><span>Sistem</span><span>Admin</span></div>
      <div className="toaster-title">Toaster Login</div>

      <div className="toaster-wrap">
        <div className="steam" ref={steamRef}>
          <div className="sp"></div><div className="sp"></div><div className="sp"></div>
        </div>

        <div className="toaster-card" ref={cardRef}>
          <div ref={loginViewRef}>
            <div className="card-title">Otentikasi</div>

            <div className="field-label">Username</div>
            <div className="input-wrap">
              <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="#8A6020" strokeWidth="2.2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <input
                type="text"
                ref={userRef}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                autoComplete="off"
                onKeyDown={(e) => e.key === "Enter" && passRef.current.focus()}
              />
            </div>

            <div className="field-label">Password</div>
            <div className="input-wrap">
              <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="#8A6020" strokeWidth="2.2">
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <input 
                type="password" 
                ref={passRef}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password" 
                onKeyDown={(e) => e.key === "Enter" && handlePullLever()}
              />
            </div>

            <div className="divider">
              <hr /><span>Tarik tuas untuk masuk</span><hr />
            </div>
          </div>

          <div className="welcome" ref={welcomeViewRef}>
            <div className="w-icon">🍞</div>
            <div className="w-title">Akses<br />Diterima!</div>
            <div className="w-sub">Memuat dashboard...</div>
          </div>
        </div>

        <div className="toaster-body">
          <div className="slots"><div className="slot"></div><div className="slot"></div></div>
          <div className="lever" ref={leverRef} onClick={handlePullLever}>
            <div className="lever-head"></div>
            <div className="lever-rod"></div>
          </div>
        </div>

        <div className="toaster-base">
          <div className="vents"><div className="vent"></div><div className="vent"></div><div className="vent"></div></div>
          <div className="tray"></div>
          <div className="feet"><div className="foot"></div><div className="foot"></div></div>
        </div>
      </div>

      <p className="status" ref={statusRef}></p>
    </div>
  );
}

export default Login;