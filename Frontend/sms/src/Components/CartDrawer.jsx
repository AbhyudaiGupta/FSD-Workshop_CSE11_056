import { useState } from 'react';

const CartDrawer = ({ 
  isOpen, 
  onClose, 
  cartItems, 
  onUpdateQty, 
  onRemoveItem, 
  onClearCart 
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [appliedCode, setAppliedCode] = useState('');

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = subtotal * (discountPercent / 100);
  const delivery = subtotal > 0 ? 3.99 : 0;
  const total = subtotal - discount + delivery;

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'GENZ20') {
      setDiscountPercent(20);
      setAppliedCode('GENZ20');
      setPromoCode('');
    } else {
      alert('Invalid promo code! Try "GENZ20" for 20% off. 😉');
    }
  };

  const handleCheckout = () => {
    setCheckoutSuccess(true);
    setTimeout(() => {
      onClearCart();
    }, 10); // Clear state behind the scenes after success loads
  };

  const handleCloseSuccess = () => {
    setCheckoutSuccess(false);
    onClose();
  };

  return (
    <div className="cart-drawer-overlay" onClick={onClose}>
      <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h2 className="cart-title">
            <span>🛍️</span>
            <span>Your Bag</span>
          </h2>
          <button 
            type="button" 
            className="close-drawer-btn" 
            onClick={onClose}
            aria-label="Close cart"
            id="close-cart-drawer"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {checkoutSuccess ? (
          <div className="checkout-success-overlay">
            <span className="success-icon" role="img" aria-label="Rocket ship and sparkles">🚀✨</span>
            <h3 className="success-title">Order Confirmed!</h3>
            <p className="success-desc">
              Your books are on their way to unlock your main character energy. Check your email for delivery details!
            </p>
            <button 
              type="button" 
              className="btn-primary" 
              onClick={handleCloseSuccess}
              style={{ marginTop: '16px' }}
              id="success-close-btn"
            >
              Back to Store
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.length === 0 ? (
                <div className="empty-cart-view">
                  <div className="empty-cart-icon" style={{ fontSize: '48px' }}>📚</div>
                  <p style={{ fontWeight: 600 }}>Your bag is empty.</p>
                  <p style={{ fontSize: '14px', opacity: 0.8 }}>Feed your brain! Go add some books. 🧠</p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="cart-item">
                    <div 
                      className="cart-item-cover" 
                      style={{ background: item.coverColor }}
                    >
                      <div className="book-cover-spine"></div>
                      <span className="cart-item-title" style={{ fontSize: '5px', color: '#fff' }}>
                        {item.title}
                      </span>
                    </div>

                    <div className="cart-item-info">
                      <h4 className="cart-item-title">{item.title}</h4>
                      <p className="cart-item-author">{item.author}</p>
                      <span className="cart-item-price">${item.price}</span>
                    </div>

                    <div className="cart-item-actions">
                      <div className="quantity-controller">
                        <button 
                          type="button" 
                          className="qty-btn" 
                          onClick={() => onUpdateQty(item.id, item.quantity - 1)}
                          aria-label="Decrease quantity"
                          id={`qty-dec-${item.id}`}
                        >
                          -
                        </button>
                        <span className="qty-value">{item.quantity}</span>
                        <button 
                          type="button" 
                          className="qty-btn" 
                          onClick={() => onUpdateQty(item.id, item.quantity + 1)}
                          aria-label="Increase quantity"
                          id={`qty-inc-${item.id}`}
                        >
                          +
                        </button>
                      </div>
                      
                      <button 
                        type="button" 
                        className="remove-item-btn"
                        onClick={() => onRemoveItem(item.id)}
                        id={`remove-cart-item-${item.id}`}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="cart-footer">
                <div className="promo-container">
                  <input
                    type="text"
                    placeholder="Enter code (GENZ20)..."
                    className="promo-input"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    id="promo-code-input"
                  />
                  <button 
                    type="button" 
                    className="promo-btn"
                    onClick={handleApplyPromo}
                    id="apply-promo-btn"
                  >
                    Apply
                  </button>
                </div>

                {appliedCode && (
                  <p className="promo-applied-text">
                    🎉 Code {appliedCode} applied! 20% discount activated.
                  </p>
                )}

                <div className="cart-summary">
                  <div className="summary-row">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="summary-row discount-row">
                      <span>Discount (20%)</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="summary-row">
                    <span>Delivery Vibe Fee</span>
                    <span>${delivery.toFixed(2)}</span>
                  </div>
                  <div className="summary-row total-row">
                    <span>Grand Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <button 
                  type="button" 
                  className="checkout-btn"
                  onClick={handleCheckout}
                  id="checkout-submit-btn"
                >
                  Checkout Now 💸
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
