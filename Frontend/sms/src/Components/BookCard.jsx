

const BookCard = ({ book, onAddToCart, onBookClick }) => {
  return (
    <div 
      className="book-card" 
      onClick={() => onBookClick(book)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onBookClick(book);
        }
      }}
      id={`book-card-${book.id}`}
    >
      {book.trending && <span className="card-trending-badge">BOOKTOK FAV</span>}
      
      <div className="card-cover-container">
        <div 
          className="book-cover-mockup" 
          style={{ background: book.coverColor }}
        >
          <div className="book-cover-spine"></div>
          <div className="book-cover-gradient-overlay"></div>
          <span className="cover-badge">{book.vibes[0] || "Featured"}</span>
          <div>
            <div className="cover-title">{book.title}</div>
            <div className="cover-author">{book.author}</div>
          </div>
        </div>
      </div>

      <div className="card-info">
        <div className="card-vibes">
          {book.vibes.slice(0, 3).map((vibe, idx) => (
            <span key={idx} className="card-vibe-tag">{vibe}</span>
          ))}
        </div>
        
        <h3 className="card-title">{book.title}</h3>
        <p className="card-author">By {book.author}</p>
        
        <div className="card-rating-row">
          <div className="star-rating" aria-label={`Rating: ${book.rating} out of 5 stars`}>
            <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
            </svg>
          </div>
          <span className="rating-value">{book.rating}</span>
          <span className="rating-count">({book.ratingCount})</span>
        </div>

        <div className="card-footer">
          <div className="price-box">
            <span className="publisher-label">{book.publisher}</span>
            <div className="price-row">
              <span className="current-price">${book.price}</span>
              {book.originalPrice > book.price && (
                <span className="original-price">${book.originalPrice}</span>
              )}
            </div>
          </div>

          <button
            type="button"
            className="add-cart-btn-icon"
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(book);
            }}
            aria-label={`Add ${book.title} to cart`}
            id={`card-add-to-cart-${book.id}`}
          >
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
