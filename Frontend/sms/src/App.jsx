import { useState } from 'react';
import Navbar from './Components/Navbar';
import Hero from './Components/Hero';
import VibeQuiz from './Components/VibeQuiz';
import BookCard from './Components/BookCard';
import BookDetailModal from './Components/BookDetailModal';
import CartDrawer from './Components/CartDrawer';
import { books } from './data/books';

/* ── Section divider shown between Hindi & English shelves ── */
const ShelfDivider = ({ language, emoji, count }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      margin: '56px 0 32px',
      textAlign: 'left',
    }}
  >
    {/* decorative line left */}
    <div style={{
      flexShrink: 0,
      width: 40,
      height: 3,
      borderRadius: 99,
      background: 'var(--gradient-text)',
    }} />

    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <span style={{ fontSize: 28 }}>{emoji}</span>
      <h2
        style={{
          fontFamily: 'var(--font-title)',
          fontSize: 28,
          fontWeight: 800,
          color: 'var(--text-primary)',
          lineHeight: 1,
          margin: 0,
        }}
      >
        {language === 'Hindi' ? 'Desi Virals' : 'Global Virals'}
      </h2>

      {/* language pill */}
      <span
        style={{
          fontSize: 12,
          fontWeight: 800,
          padding: '3px 12px',
          borderRadius: 20,
          background: language === 'Hindi'
            ? 'linear-gradient(135deg,#EA580C,#BE123C)'
            : 'linear-gradient(135deg,#0F766E,#0891B2)',
          color: '#fff',
          letterSpacing: '0.5px',
          textTransform: 'uppercase',
        }}
      >
        {language === 'Hindi' ? '🇮🇳 Hindi' : '🌍 English'}
      </span>

      <span style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 600 }}>
        {count} titles
      </span>
    </div>

    {/* decorative line right */}
    <div style={{
      flexGrow: 1,
      height: 1,
      background: 'var(--border-color)',
    }} />
  </div>
);

/* ── "No results" placeholder ── */
const EmptyShelf = () => (
  <div style={{
    padding: '40px 0',
    textAlign: 'center',
    color: 'var(--text-secondary)',
    gridColumn: '1 / -1',
  }}>
    <span style={{ fontSize: 40 }}>🧐</span>
    <p style={{ marginTop: 12, fontWeight: 600 }}>No books match your search in this section.</p>
  </div>
);

function App() {
  const [cartItems,    setCartItems]    = useState([]);
  const [searchQuery,  setSearchQuery]  = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [isCartOpen,   setIsCartOpen]   = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  /* ── cart helpers ── */
  const handleAddToCart = (book) => {
    setCartItems(prev => {
      const ex = prev.find(i => i.id === book.id);
      return ex
        ? prev.map(i => i.id === book.id ? { ...i, quantity: i.quantity + 1 } : i)
        : [...prev, { ...book, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQty = (id, qty) => {
    if (qty <= 0) { handleRemoveItem(id); return; }
    setCartItems(prev => prev.map(i => i.id === id ? { ...i, quantity: qty } : i));
  };

  const handleRemoveItem = (id) =>
    setCartItems(prev => prev.filter(i => i.id !== id));

  const handleClearCart = () => setCartItems([]);

  /* ── filter pills ── */
  const filterCategories = [
    'All',
    'Tragic Romance',
    'Academic Weapon',
    'Cozy Vibe',
    'Poetic Vibe',
    'Enemies to Lovers',
    'Mythology',
  ];

  /* ── filter & split by language ── */
  const filterBook = (book) => {
    const matchSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchSearch) return false;
    if (activeFilter === 'All') return true;
    return book.vibes.some(v => v.toLowerCase() === activeFilter.toLowerCase());
  };

  const hindiBooks   = books.filter(b => b.language === 'Hindi'   && filterBook(b));
  const englishBooks = books.filter(b => b.language === 'English'  && filterBook(b));

  const handleScrollToCatalogue = () => {
    document.getElementById('catalogue')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* ── Background gradient orbs ── */}
      <div className="bg-glow-orb orb-1" aria-hidden="true" />
      <div className="bg-glow-orb orb-2" aria-hidden="true" />
      <div className="bg-glow-orb orb-3" aria-hidden="true" />

      {/* ── Nav ── */}
      <Navbar
        cartCount={cartItems.reduce((a, i) => a + i.quantity, 0)}
        onCartClick={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* ── Hero ── */}
      <Hero onExploreClick={handleScrollToCatalogue} />

      {/* ── Vibe Quiz ── */}
      <VibeQuiz onAddToCart={handleAddToCart} onBookClick={setSelectedBook} />

      {/* ══════════════════════════════════════════
           CATALOGUE — two language shelves
         ══════════════════════════════════════════ */}
      <section className="catalogue-section" id="catalogue">
        <div className="container">

          {/* Header + filter pills */}
          <div className="section-header">
            <div className="section-info">
              <h2 className="section-title">📖 Aesthetic Catalogue</h2>
              <p className="section-desc">Filter by vibes across Hindi & English shelves.</p>
            </div>
            <div className="filter-pills" role="tablist">
              {filterCategories.map(cat => (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={activeFilter === cat}
                  className={`filter-pill ${activeFilter === cat ? 'active' : ''}`}
                  onClick={() => setActiveFilter(cat)}
                  id={`filter-pill-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* ─── Hindi Shelf ─── */}
          <ShelfDivider language="Hindi" emoji="🪔" count={hindiBooks.length} />
          <div className="books-grid">
            {hindiBooks.length === 0
              ? <EmptyShelf />
              : hindiBooks.map(book => (
                  <BookCard
                    key={book.id}
                    book={book}
                    onAddToCart={handleAddToCart}
                    onBookClick={setSelectedBook}
                  />
                ))
            }
          </div>

          {/* ─── English Shelf ─── */}
          <ShelfDivider language="English" emoji="🌍" count={englishBooks.length} />
          <div className="books-grid">
            {englishBooks.length === 0
              ? <EmptyShelf />
              : englishBooks.map(book => (
                  <BookCard
                    key={book.id}
                    book={book}
                    onAddToCart={handleAddToCart}
                    onBookClick={setSelectedBook}
                  />
                ))
            }
          </div>
        </div>
      </section>

      {/* ── Detail Modal ── */}
      <BookDetailModal
        book={selectedBook}
        isOpen={!!selectedBook}
        onClose={() => setSelectedBook(null)}
        onAddToCart={handleAddToCart}
      />

      {/* ── Cart Drawer ── */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* ── Footer ── */}
      <footer className="footer">
        <div className="container footer-grid">

          <div className="footer-col">
            <a href="#" className="logo" style={{ textDecoration: 'none' }}>
              <span className="logo-icon">📚</span>
              <span className="gradient-heading">VibeShelf</span>
            </a>
            <p className="footer-desc">
              Where desi classics meet global bestsellers. Curated reads for the modern Indian reader who loves stories that actually slap. 🧡
            </p>
          </div>

          <div className="footer-col">
            <h3 className="footer-col-title">Browse</h3>
            <div className="footer-links">
              <a href="#home"      className="footer-link">Home</a>
              <a href="#catalogue" className="footer-link">Shop All</a>
              <a href="#vibe-quiz" className="footer-link">Vibe Quiz</a>
            </div>
          </div>

          <div className="footer-col">
            <h3 className="footer-col-title">Hindi Shelf 🪔</h3>
            <div className="footer-links">
              <a href="#catalogue" className="footer-link">Gunahon Ka Devta</a>
              <a href="#catalogue" className="footer-link">Madhushala</a>
              <a href="#catalogue" className="footer-link">Rashmirathi</a>
              <a href="#catalogue" className="footer-link">Yaar Papa</a>
            </div>
          </div>

          <div className="footer-col">
            <h3 className="footer-col-title">Support</h3>
            <div className="footer-links">
              <a href="#" className="footer-link">Track Order</a>
              <a href="#" className="footer-link">FAQs</a>
              <a href="#" className="footer-link">Student Discount</a>
            </div>
          </div>
        </div>

        <div className="container footer-bottom">
          <div>© {new Date().getFullYear()} VibeShelf · Made with 🧡 for India's readers</div>
          <div className="footer-socials">
            <a href="#" className="social-icon-link">Instagram</a>
            <a href="#" className="social-icon-link">YouTube</a>
            <a href="#" className="social-icon-link">Twitter/X</a>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
