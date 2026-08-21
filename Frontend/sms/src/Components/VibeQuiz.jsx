import { useState } from 'react';
import { books } from '../data/books';

const VibeQuiz = ({ onAddToCart, onBookClick }) => {
  const [selectedVibe, setSelectedVibe] = useState(null);

  const vibeOptions = [
    { label: "Main Character Energy", emoji: "👑", desc: "Feel unstoppable — epics, heroes, and destiny await." },
    { label: "Down Bad",              emoji: "🥺", desc: "Need emotional comfort or a heart-wrenching romance." },
    { label: "Brain-rot Cure",        emoji: "🧠", desc: "Something fast-paced, wild, and mind-bending." },
    { label: "Intense Plot",          emoji: "🕵️", desc: "Dark secrets, tragic heroes, and unforgettable twists." }
  ];

  const matchedBook = selectedVibe
    ? books.find(book => book.vibeMatch === selectedVibe)
    : null;

  return (
    <section className="quiz-section" id="vibe-quiz">
      <div className="container">
        <div className="quiz-card">
          <div className="quiz-subtitle">🪔 The Vibe Matcher</div>
          <h2 className="quiz-title">What is your current energy?</h2>
          <p className="quiz-desc">
            Skip the endless scrolling. Select your current mood and we'll instantly match you with the perfect read — Hindi classic or global hit.
          </p>

          <div className="vibe-grid">
            {vibeOptions.map((vibe) => (
              <button
                key={vibe.label}
                type="button"
                className={`vibe-option-btn ${selectedVibe === vibe.label ? 'selected' : ''}`}
                onClick={() => setSelectedVibe(vibe.label)}
                id={`vibe-opt-${vibe.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <span className="vibe-emoji" role="img" aria-label={vibe.label}>{vibe.emoji}</span>
                <span className="vibe-label">{vibe.label}</span>
                <span style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  {vibe.desc}
                </span>
              </button>
            ))}
          </div>

          {matchedBook && (
            <div className="vibe-result">
              <h3 className="vibe-result-heading">
                ✨ Your Match: <span style={{ color: 'var(--primary)' }}>{matchedBook.title}</span>
              </h3>
              <div className="result-card-container">
                <div
                  className="book-card"
                  onClick={() => onBookClick(matchedBook)}
                  style={{ cursor: 'pointer', textAlign: 'left' }}
                >
                  <div className="card-cover-container">
                    <div
                      className="book-cover-mockup"
                      style={{ background: matchedBook.coverColor }}
                    >
                      <div className="book-cover-spine"></div>
                      <div className="book-cover-gradient-overlay"></div>
                      <span className="cover-badge">{matchedBook.vibes[0]}</span>
                      <div>
                        <div className="cover-title">{matchedBook.title}</div>
                        <div className="cover-author">{matchedBook.author}</div>
                      </div>
                    </div>
                  </div>

                  <div className="card-info">
                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
                      <span style={{
                        fontSize: '11px',
                        background: matchedBook.language === 'Hindi'
                          ? 'rgba(234,88,12,0.1)' : 'rgba(15,118,110,0.1)',
                        color: matchedBook.language === 'Hindi'
                          ? 'var(--primary)' : 'var(--accent)',
                        border: `1px solid ${matchedBook.language === 'Hindi'
                          ? 'rgba(234,88,12,0.2)' : 'rgba(15,118,110,0.2)'}`,
                        padding: '2px 8px', borderRadius: '8px', fontWeight: 700
                      }}>
                        {matchedBook.language === 'Hindi' ? '🇮🇳 Hindi' : '🌍 English'}
                      </span>
                    </div>
                    <div className="card-vibes">
                      {matchedBook.vibes.map((v, i) => (
                        <span key={i} className="card-vibe-tag">{v}</span>
                      ))}
                    </div>
                    <h4 className="card-title">{matchedBook.title}</h4>
                    <p className="card-author">By {matchedBook.author}</p>

                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)', display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {matchedBook.synopsis}
                    </p>

                    <div className="card-footer">
                      <div className="price-box">
                        <span className="publisher-label">{matchedBook.publisher}</span>
                        <div className="price-row">
                          <span className="current-price">${matchedBook.price}</span>
                          {matchedBook.originalPrice > matchedBook.price && (
                            <span className="original-price">${matchedBook.originalPrice}</span>
                          )}
                        </div>
                      </div>
                      <button
                        type="button"
                        className="add-cart-btn-icon"
                        onClick={(e) => { e.stopPropagation(); onAddToCart(matchedBook); }}
                        aria-label={`Add ${matchedBook.title} to cart`}
                        id={`quiz-add-to-cart-${matchedBook.id}`}
                      >
                        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <line x1="12" y1="5" x2="12" y2="19"></line>
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default VibeQuiz;
