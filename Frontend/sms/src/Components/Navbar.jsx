

const Navbar = ({ cartCount, onCartClick, searchQuery, setSearchQuery }) => {
  return (
    <nav className="navbar">
      <div className="container navbar-content">
        <a href="#" className="logo">
          <span className="logo-icon">📚</span>
          <span className="gradient-heading">VibeShelf</span>
        </a>

        <div className="nav-links">
          <a href="#" className="nav-link">Home</a>
          <a href="#catalogue" className="nav-link">Shop</a>
          <a href="#vibe-quiz" className="nav-link">Vibe Check</a>
        </div>

        <div className="nav-actions">
          <div className="search-bar-container">
            <span className="visually-hidden">Search books</span>
            <input
              type="text"
              placeholder="Search by title or author..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              id="book-search-input"
            />
            <svg 
              className="search-icon" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>

          <button 
            type="button" 
            className="cart-btn" 
            onClick={onCartClick}
            aria-label="Open Shopping Cart"
            id="open-cart-button"
          >
            <svg 
              width="20" 
              height="20" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
