
const Hero = ({ onExploreClick }) => {
  return (
    <section className="hero-section" id="home">
      <div className="container hero-grid">
        <div className="hero-text">
          <span className="tagline">🪔 Curated Desi & Global Reads</span>
          <h1 className="hero-title">
            <span>Stop reading</span>
            <span className="gradient-heading">boring books.</span>
            <span>Find your Desi vibe check. 🧡</span>
          </h1>
          <p className="hero-desc">
            From heartbreaking Hindi classics to global bestsellers — find your next hyperfixation curated just for you. No gatekeeping, pure desi flavour.
          </p>
          <div className="hero-btns">
            <button
              type="button"
              className="btn-primary"
              onClick={onExploreClick}
              id="explore-catalog-btn"
            >
              Explore Books 📚
            </button>
            <a
              href="#vibe-quiz"
              className="btn-secondary"
              style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
              id="vibe-quiz-shortcut-btn"
            >
              Take Vibe Quiz ✨
            </a>
          </div>
        </div>

        <div className="hero-visual">
          <div
            className="featured-book-3d"
            style={{
              background: 'linear-gradient(135deg, #e11d48, #9f1239)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '30px 24px',
              color: '#fff'
            }}
          >
            <div className="book-cover-spine"></div>
            <div className="book-cover-gradient-overlay"></div>
            <div className="cover-badge" style={{ fontSize: '10px', padding: '4px 10px' }}>⭐ Hindi Classic</div>
            <div>
              <div
                className="cover-title"
                style={{
                  fontSize: '28px',
                  fontFamily: 'var(--font-title)',
                  fontWeight: 800,
                  lineHeight: 1.1,
                  textShadow: '0 4px 8px rgba(0,0,0,0.4)'
                }}
              >
                Gunahon Ka Devta
              </div>
              <div
                className="cover-author"
                style={{
                  fontSize: '14px',
                  opacity: 0.9,
                  marginTop: '8px',
                  textShadow: '0 2px 4px rgba(0,0,0,0.4)'
                }}
              >
                Dharamvir Bharati
              </div>
            </div>
          </div>
          <div className="book-shadow"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
