

const BookDetailModal = ({ book, isOpen, onClose, onAddToCart }) => {
  if (!isOpen || !book) return null;

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button 
          type="button" 
          className="modal-close-btn" 
          onClick={onClose}
          aria-label="Close details"
          id="close-details-modal"
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="modal-body">
          <div className="modal-grid">
            <div className="modal-left">
              <div 
                className="modal-cover-mockup" 
                style={{ background: book.coverColor }}
              >
                <div className="book-cover-spine"></div>
                <div className="book-cover-gradient-overlay"></div>
                <span className="cover-badge">{book.vibes[0]}</span>
                <div>
                  <div className="cover-title">{book.title}</div>
                  <div className="cover-author">{book.author}</div>
                </div>
              </div>
            </div>

            <div className="modal-right">
              <div className="modal-meta-header">
                <div className="modal-tags">
                  {book.vibes.map((v, i) => (
                    <span key={i} className={`modal-tag ${i % 2 === 1 ? 'accent-tag' : ''}`}>{v}</span>
                  ))}
                </div>
                <h2 className="modal-title">{book.title}</h2>
                <div className="modal-author">By {book.author}</div>
              </div>

              <div className="modal-rating-row">
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ color: '#fbbf24', display: 'flex' }}>
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                    </svg>
                  </span>
                  <span className="rating-value">{book.rating}</span>
                  <span className="rating-count">({book.ratingCount} reviews)</span>
                </div>
                <div>•</div>
                <div>
                  <span style={{ color: 'var(--text-secondary)' }}>Spice: </span>
                  <span>{book.spiceLevel}</span>
                </div>
              </div>

              <p className="modal-synopsis">{book.synopsis}</p>

              <div className="modal-details-table">
                <div className="detail-item">
                  <span className="detail-label">Publisher</span>
                  <span className="detail-value">{book.publisher}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Year Published</span>
                  <span className="detail-value">{book.publishYear}</span>
                </div>
              </div>

              <div className="modal-reviews-section">
                <h3 className="reviews-title">💬 Reader Vibes (#BookTok Reviews)</h3>
                {book.reviews && book.reviews.map((rev, index) => (
                  <div key={index} className="review-bubble">
                    <div className="review-header">
                      <span className="review-user">{rev.user}</span>
                      <span className="review-likes">❤️ {rev.likes}</span>
                    </div>
                    <p className="review-text">"{rev.comment}"</p>
                  </div>
                ))}
              </div>

              <div className="modal-checkout-row">
                <div className="modal-price-box">
                  <span className="publisher-label">Price</span>
                  <span className="modal-price">${book.price}</span>
                </div>
                <button
                  type="button"
                  className="modal-buy-btn"
                  onClick={() => {
                    onAddToCart(book);
                    onClose();
                  }}
                  id={`modal-add-to-cart-${book.id}`}
                >
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                  </svg>
                  Add to Bag
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailModal;
