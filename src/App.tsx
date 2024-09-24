// src/App.tsx
import React, { useState, useEffect, ErrorInfo } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import LembarUjian from './LembarUjian';

class ErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean}> {
  constructor(props: {children: React.ReactNode}) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log("Caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

const App: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [currentImage, setCurrentImage] = useState<number>(0);
  const images = ['/1.jpeg', '/2.jpeg']; // Path relatif ke folder public

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentImage((prev: number) => (prev + 1) % images.length);
    }, 5000); // Ganti gambar tiap 5 detik
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <Router>
      <div className={`app-container ${isVisible ? 'fade-in' : ''}`}>
        <header className="app-header card blue-card">
          <h1 className="logo-animate">PendidikanKita</h1>
          <nav>
            <Link to="/" className="nav-link-animate">Beranda</Link>
            <Link to="/ujian" className="nav-link-animate">Lembar Ujian</Link>
            <a href="#fitur" className="nav-link-animate">Fitur</a>
            <a href="#testimoni" className="nav-link-animate">Testimoni</a>
            <a href="#kontak" className="nav-link-animate">Kontak</a>
          </nav>
          <div className="auth-buttons">
            <button className="login-btn pulse">Masuk</button>
            <button className="signup-btn shake">Daftar</button>
          </div>
        </header>

        <main className="app-main">
          <Routes>
            <Route path="/" element={
              <>
                <section className="hero-section slide-in-left card green-card">
                  <div className="hero-content">
                    <h2 className="typing">Jelajahi Dunia Belajar Tanpa Batas!</h2>
                    <p className="fade-in-up">Temukan berbagai konsep dan topik baru dengan ribuan sumber belajar digital dan cetak.</p>
                    <button className="cta-btn bounce">Gabung Gratis</button>
                  </div>
                  <div className="hero-image-container">
                    <img src={images[currentImage]} alt="Hero" className="hero-image fade-in" />
                  </div>
                </section>
                
                {/* Tambahkan section fitur dengan card-card */}
                <section className="features-section">
                  <div className="feature zoom-in card orange-card">
                    <h3>Pelajaran Interaktif</h3>
                    <p>Belajar jadi lebih seru dengan materi interaktif dan menarik.</p>
                  </div>
                  <div className="feature zoom-in delay-1 card purple-card">
                    <h3>Latihan Soal</h3>
                    <p>Uji pemahaman kamu dengan ribuan soal latihan dari berbagai mata pelajaran.</p>
                  </div>
                  <div className="feature zoom-in delay-2 card pink-card">
                    <h3>Konsultasi Guru</h3>
                    <p>Tanya langsung ke guru ahli kapan saja dan di mana saja.</p>
                  </div>
                </section>
              </>
            } />
            <Route path="/ujian" element={<ErrorBoundary><LembarUjian /></ErrorBoundary>} />
          </Routes>
        </main>

        <footer className="app-footer slide-in-bottom card teal-card">
          <div className="footer-links">
            <a href="#tentang" className="footer-link-animate">Tentang Kami</a>
            <a href="#privasi" className="footer-link-animate">Kebijakan Privasi</a>
            <a href="#syarat" className="footer-link-animate">Syarat dan Ketentuan</a>
          </div>
          <p>&copy; 2023 PendidikanKita. Semua hak dilindungi.</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;