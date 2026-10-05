import { useMemo, useState } from 'react'
import { BrowserRouter, Link, NavLink, Route, Routes, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { CartProvider } from './CartContext'
import { useCart } from './useCart'
import { books, categories } from './data'
import './App.css'

const money = (value) => `$${value.toFixed(2)}`

function Icon({ name, size = 20 }) {
  const paths = {
    search: <><circle cx="11" cy="11" r="7" /><path d="m16 16 4 4" /></>,
    bag: <><path d="M5 8h14l-1 13H6L5 8Z" /><path d="M9 9V6a3 3 0 0 1 6 0v3" /></>,
    arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    plus: <><path d="M12 5v14" /><path d="M5 12h14" /></>,
    minus: <path d="M5 12h14" />,
    close: <><path d="m18 6-12 12" /><path d="m6 6 12 12" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    star: <path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.8 1-6.1-4.4-4.3 6.1-.9L12 3Z" />,
    heart: <path d="M20.8 8.8c0 4.1-8.8 10-8.8 10s-8.8-5.9-8.8-10A4.6 4.6 0 0 1 12 6.3a4.6 4.6 0 0 1 8.8 2.5Z" />,
    menu: <><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></>,
  }
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>
}

function Header() {
  const { count } = useCart()
  const [search, setSearch] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  const submitSearch = (event) => {
    event.preventDefault()
    navigate(`/books${search.trim() ? `?q=${encodeURIComponent(search.trim())}` : ''}`)
    setMenuOpen(false)
  }

  return (
    <header className="site-header">
      <div className="header-top">
        <Link to="/" className="wordmark" aria-label="Papertrail home"><span className="brand-mark">p.</span><span>papertrail<span className="brand-period">.</span></span></Link>
        <form className="header-search" onSubmit={submitSearch} role="search">
          <Icon name="search" size={18} />
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search books, authors..." aria-label="Search books" />
          <button type="submit" aria-label="Submit search"><span>↵</span></button>
        </form>
        <div className="header-actions">
          <span className="shipping-note">A little joy, delivered.</span>
          <Link to="/cart" className="cart-link"><Icon name="bag" size={21} /><span>Bag</span><span className="cart-count">{count}</span></Link>
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation"><Icon name="menu" /></button>
        </div>
      </div>
      <nav className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
        <NavLink to="/" end onClick={() => setMenuOpen(false)}>Home</NavLink>
        <NavLink to="/books" onClick={() => setMenuOpen(false)}>Browse all</NavLink>
        <NavLink to="/books?category=Fiction" onClick={() => setMenuOpen(false)}>Fiction</NavLink>
        <NavLink to="/books?category=Memoir" onClick={() => setMenuOpen(false)}>Memoir</NavLink>
        <NavLink to="/books?category=Self-growth" onClick={() => setMenuOpen(false)}>Self-growth</NavLink>
        <span className="nav-note">Independent books, thoughtfully picked <span>✳</span></span>
      </nav>
    </header>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <Link to="/" className="wordmark footer-wordmark"><span className="brand-mark">p.</span><span>papertrail<span className="brand-period">.</span></span></Link>
      <p>For the love of a good story.</p>
      <span>© 2025 Papertrail Books</span>
    </footer>
  )
}

function BookCard({ book, index = 0 }) {
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)
  const add = () => {
    addToCart(book)
    setAdded(true)
    window.setTimeout(() => setAdded(false), 1400)
  }

  return (
    <article className="book-card" style={{ animationDelay: `${index * 70}ms` }}>
      <Link to={`/books/${book.id}`} className="book-cover-link" aria-label={`View ${book.title}`}>
        <div className="book-cover" style={{ '--cover-color': book.color }}>
          <img src={book.cover} alt="" loading="lazy" />
          {book.badge && <span className="book-badge">{book.badge}</span>}
        </div>
      </Link>
      <div className="book-card-info">
        <Link to={`/books/${book.id}`} className="book-title">{book.title}</Link>
        <p className="book-author">{book.author}</p>
        <div className="book-card-bottom"><span className="book-price">{money(book.price)}</span><button className={`quick-add ${added ? 'added' : ''}`} onClick={add} aria-label={`Add ${book.title} to bag`}><Icon name={added ? 'check' : 'plus'} size={18} /></button></div>
      </div>
    </article>
  )
}

function SectionHeading({ eyebrow, title, linkText, to }) {
  return <div className="section-heading"><div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2></div>{linkText && <Link to={to} className="text-link">{linkText}<Icon name="arrow" size={17} /></Link>}</div>
}

function HomePage() {
  return (
    <main>
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow light-eyebrow"><span className="eyebrow-dot" /> YOUR NEXT FAVORITE IS HERE</span>
          <h1>Find your<br />next <em>chapter.</em></h1>
          <p>Good books, chosen with care. Discover stories that stay with you long after the last page.</p>
          <Link to="/books" className="button button-cream">Explore the collection <Icon name="arrow" size={18} /></Link>
          <div className="hero-proof"><div className="avatar-stack"><span>J</span><span>M</span><span>A</span><span>+</span></div><span>Loved by <strong>2,400+</strong> curious readers</span></div>
        </div>
        <div className="hero-art">
          <div className="sun-disc" />
          <div className="hero-book hero-book-back"><img src={books[1].cover} alt="A reader's favorite book" /></div>
          <div className="hero-book hero-book-front"><img src={books[0].cover} alt="A featured book from Papertrail" /></div>
          <div className="hero-note"><span>✳</span><span>Stories worth<br />staying in for.</span></div>
          <div className="hero-scribble">read a little<br />every day</div>
        </div>
        <div className="hero-bottom"><span>01 — 04</span><span>THE GOOD READ EDITION</span><span>SCROLL TO EXPLORE ↓</span></div>
      </section>

      <section className="home-section picks-section">
        <SectionHeading eyebrow="THE PAPERTRAIL EDIT" title="A few good reads" linkText="Shop all books" to="/books" />
        <div className="book-grid">{books.slice(0, 4).map((book, index) => <BookCard key={book.id} book={book} index={index} />)}</div>
      </section>

      <section className="quote-band"><span className="quote-mark">“</span><blockquote>A book is a little bit of somebody else’s life you get to keep.</blockquote><span className="quote-byline">A NOTE FROM OUR BOOKSHOP</span></section>

      <section className="home-section categories-section">
        <SectionHeading eyebrow="FOLLOW YOUR CURIOSITY" title="What are you in the mood for?" />
        <div className="category-grid">
          {[
            ['Fiction', 'Worlds to get lost in.', '01', '#d9e0d1'],
            ['Memoir', 'True stories, deeply felt.', '02', '#e9d8c6'],
            ['Self-growth', 'A little nudge forward.', '03', '#d8dce3'],
            ['Nature', 'Closer to the wild.', '04', '#d8e0d5'],
          ].map(([name, description, number, color]) => <Link key={name} to={`/books?category=${encodeURIComponent(name)}`} className="category-tile" style={{ '--tile-color': color }}><span className="category-number">{number} / 04</span><span className="category-title">{name}<Icon name="arrow" size={18} /></span><span className="category-description">{description}</span><span className="category-spark">✳</span></Link>)}
        </div>
      </section>
      <section className="newsletter"><div><span className="eyebrow">THE SUNDAY BOOKSHELF</span><h2>A good read in your inbox.</h2><p>New finds, reading notes, and little things we love. Never noise.</p></div><Link to="/books" className="button button-forest">Find your next read <Icon name="arrow" size={18} /></Link><span className="newsletter-flower">✳</span></section>
    </main>
  )
}

function CatalogPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const category = searchParams.get('category') || 'All books'
  const sort = searchParams.get('sort') || 'featured'
  const visibleBooks = useMemo(() => {
    const filtered = books.filter((book) => {
      const matchesCategory = category === 'All books' || book.category === category
      const matchesQuery = `${book.title} ${book.author} ${book.category}`.toLowerCase().includes(query.toLowerCase())
      return matchesCategory && matchesQuery
    })
    if (sort === 'price-low') return filtered.sort((a, b) => a.price - b.price)
    if (sort === 'price-high') return filtered.sort((a, b) => b.price - a.price)
    if (sort === 'rating') return filtered.sort((a, b) => b.rating - a.rating)
    return filtered
  }, [category, query, sort])

  const updateParam = (key, value) => {
    const next = new URLSearchParams(searchParams)
    if (value && value !== 'All books' && value !== 'featured') next.set(key, value)
    else next.delete(key)
    setSearchParams(next)
  }

  return (
    <main className="catalog-page page-shell">
      <div className="page-intro"><span className="eyebrow">A SHELF FULL OF POSSIBILITIES</span><h1>Books to <em>come back to.</em></h1><p>Every title on our shelves is here for a reason. Take your time finding yours.</p></div>
      <div className="catalog-toolbar">
        <div className="category-tabs" aria-label="Filter by category">{categories.map((item) => <button key={item} className={category === item ? 'active' : ''} onClick={() => updateParam('category', item)}>{item}</button>)}</div>
        <label className="sort-control">Sort by <select value={sort} onChange={(event) => updateParam('sort', event.target.value)}><option value="featured">Featured</option><option value="rating">Top rated</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option></select></label>
      </div>
      {query && <div className="results-label">Showing results for <strong>“{query}”</strong> <button onClick={() => updateParam('q', '')}>Clear search <Icon name="close" size={14} /></button></div>}
      {visibleBooks.length > 0 ? <div className="book-grid catalog-grid">{visibleBooks.map((book, index) => <BookCard key={book.id} book={book} index={index} />)}</div> : <div className="empty-results"><span>✳</span><h2>No books on this page (yet).</h2><p>Try another title, author, or category. Your next read is out there.</p><button className="button button-forest" onClick={() => { setSearchParams({}); }}>See all books</button></div>}
      <div className="catalog-endnote">THOUGHTFULLY PICKED. ALWAYS.</div>
    </main>
  )
}

function BookDetailsPage() {
  const { bookId } = useParams()
  const book = books.find((item) => item.id === bookId)
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)
  if (!book) return <NotFound />
  const add = () => {
    addToCart(book)
    setAdded(true)
    window.setTimeout(() => setAdded(false), 1600)
  }

  return (
    <main className="page-shell details-page">
      <div className="breadcrumbs"><Link to="/">Home</Link><span>/</span><Link to="/books">Books</Link><span>/</span><span>{book.title}</span></div>
      <div className="details-layout">
        <div className="details-cover-wrap"><div className="details-cover" style={{ '--cover-color': book.color }}><img src={book.cover} alt={`Cover artwork for ${book.title}`} /></div><span className="cover-caption">A PAPERTRAIL BOOKSHOP PICK</span></div>
        <div className="details-copy"><span className="eyebrow">{book.category.toUpperCase()} {book.badge && <span className="detail-badge">· {book.badge.toUpperCase()}</span>}</span><h1>{book.title}</h1><p className="details-author">by <span>{book.author}</span></p><div className="rating-line"><span className="stars"><Icon name="star" size={17} /></span><strong>{book.rating}</strong><span>({book.reviews.toLocaleString()} reader reviews)</span></div><p className="details-description">{book.description}</p><div className="details-price">{money(book.price)} <span>USD</span></div><button className="button button-forest details-add" onClick={add}><Icon name={added ? 'check' : 'bag'} size={19} />{added ? 'Added to your bag' : 'Add to bag'} <span>{money(book.price)}</span></button><div className="detail-perks"><span><Icon name="check" size={17} /> Free shipping over $45</span><span><Icon name="check" size={17} /> Thoughtfully packed</span></div><div className="details-note"><span>✳</span><p>Every book we carry is one we’d happily pass to a friend.</p></div></div>
      </div>
      <section className="home-section related-section"><SectionHeading eyebrow="KEEP TURNING PAGES" title="You might also like" linkText="See all books" to="/books" /><div className="book-grid">{books.filter((item) => item.id !== book.id).slice(0, 4).map((item, index) => <BookCard key={item.id} book={item} index={index} />)}</div></section>
    </main>
  )
}

function OrderSummary({ checkout = false }) {
  const { items, subtotal } = useCart()
  const shipping = subtotal === 0 || subtotal >= 45 ? 0 : 4.95
  return <aside className="order-summary"><h2>Your order</h2><div className="summary-items">{items.map((item) => <div className="summary-item" key={item.id}><img src={item.cover} alt="" /><span>{item.title}<small>Qty {item.quantity}</small></span><strong>{money(item.price * item.quantity)}</strong></div>)}</div><div className="summary-row"><span>Subtotal</span><span>{money(subtotal)}</span></div><div className="summary-row"><span>Shipping</span><span>{shipping === 0 ? 'On us' : money(shipping)}</span></div>{shipping > 0 && <p className="shipping-hint">Add {money(45 - subtotal)} more for free shipping.</p>}<div className="summary-total"><span>Total</span><strong>{money(subtotal + shipping)}</strong></div>{checkout && <p className="checkout-secure">✳ Secure checkout · Packed with care</p>}</aside>
}

function CartPage() {
  const { items, count, updateQuantity, removeFromCart } = useCart()
  if (!items.length) return <main className="page-shell empty-cart"><div className="empty-cart-icon"><Icon name="bag" size={29} /></div><span className="eyebrow">YOUR BAG IS WAITING</span><h1>Nothing in here <em>just yet.</em></h1><p>There are some lovely stories waiting to find their way home.</p><Link to="/books" className="button button-forest">Browse the books <Icon name="arrow" size={18} /></Link></main>
  return (
    <main className="page-shell cart-page"><div className="page-intro compact-intro"><span className="eyebrow">THE GOOD STUFF</span><h1>Your book <em>bag.</em></h1><p>{count} {count === 1 ? 'book' : 'books'}, picked by you.</p></div><div className="cart-layout"><section className="cart-items">{items.map((item) => <article className="cart-item" key={item.id}><Link to={`/books/${item.id}`} className="cart-item-cover"><img src={item.cover} alt="" /></Link><div className="cart-item-info"><Link to={`/books/${item.id}`} className="cart-item-title">{item.title}</Link><span>{item.author}</span><span className="cart-item-price">{money(item.price)}</span><div className="quantity-control"><button onClick={() => updateQuantity(item.id, item.quantity - 1)} aria-label={`Decrease ${item.title} quantity`}><Icon name="minus" size={15} /></button><span>{item.quantity}</span><button onClick={() => updateQuantity(item.id, item.quantity + 1)} aria-label={`Increase ${item.title} quantity`}><Icon name="plus" size={15} /></button></div></div><div className="cart-item-end"><strong>{money(item.price * item.quantity)}</strong><button className="remove-item" onClick={() => removeFromCart(item.id)}><Icon name="close" size={14} /> Remove</button></div></article>)}<Link to="/books" className="continue-shopping">← Keep browsing</Link></section><div className="cart-summary"><OrderSummary /><Link to="/checkout" className="button button-forest checkout-link">Continue to checkout <Icon name="arrow" size={18} /></Link><p className="cart-reassurance">A little joy, packed and sent with care.</p></div></div></main>
  )
}

function CheckoutPage() {
  const { items, clearCart } = useCart()
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [orderNumber] = useState(() => `PT-${Math.random().toString(36).slice(2, 8).toUpperCase()}`)
  const navigate = useNavigate()
  if (orderPlaced) return <main className="page-shell order-success"><div className="success-icon"><Icon name="check" size={30} /></div><span className="eyebrow">IT’S OFFICIAL</span><h1>A good story is <em>on its way.</em></h1><p>Thank you for shopping small. Your order <strong>{orderNumber}</strong> is being wrapped with care.</p><Link to="/books" className="button button-forest">Find another good read <Icon name="arrow" size={18} /></Link></main>
  if (!items.length) return <main className="page-shell empty-cart"><div className="empty-cart-icon"><Icon name="bag" size={29} /></div><span className="eyebrow">NOTHING TO CHECK OUT</span><h1>Your bag is <em>empty.</em></h1><p>Pick out a story or two and we’ll take it from there.</p><Link to="/books" className="button button-forest">Browse the books <Icon name="arrow" size={18} /></Link></main>
  const handleSubmit = (event) => {
    event.preventDefault()
    clearCart()
    setOrderPlaced(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  return (
    <main className="page-shell checkout-page"><div className="page-intro compact-intro"><span className="eyebrow">ALMOST YOURS</span><h1>Make it <em>official.</em></h1><p>Good books are on their way. Just a few details.</p></div><div className="checkout-layout"><form className="checkout-form" onSubmit={handleSubmit}><div className="form-section"><h2><span>01</span> Contact</h2><label>Email address<input type="email" name="email" placeholder="you@example.com" autoComplete="email" required /></label></div><div className="form-section"><h2><span>02</span> Delivery address</h2><div className="form-row"><label>First name<input name="firstName" autoComplete="given-name" required /></label><label>Last name<input name="lastName" autoComplete="family-name" required /></label></div><label>Street address<input name="address" autoComplete="street-address" required /></label><div className="form-row"><label>City<input name="city" autoComplete="address-level2" required /></label><label>ZIP / postal code<input name="postalCode" autoComplete="postal-code" required /></label></div><label>Country<select name="country" autoComplete="country-name" defaultValue="" required><option value="" disabled>Select country</option><option>United States</option><option>Canada</option><option>United Kingdom</option><option>Australia</option><option>India</option></select></label></div><div className="form-section payment-section"><h2><span>03</span> Payment</h2><div className="demo-payment"><Icon name="heart" size={18} /><p>Payment is in demo mode.<br /><span>No real payment details are collected.</span></p><span className="demo-tag">DEMO</span></div></div><button className="button button-forest place-order" type="submit">Place your order <Icon name="arrow" size={18} /></button><p className="checkout-terms">By placing your order, you agree to our very reasonable book-loving ways.</p></form><div className="checkout-summary"><OrderSummary checkout /><button className="back-to-cart" onClick={() => navigate('/cart')}>← Back to your bag</button></div></div></main>
  )
}

function NotFound() {
  return <main className="page-shell empty-cart"><div className="empty-cart-icon">✳</div><span className="eyebrow">THIS PAGE IS A MYSTERY</span><h1>We couldn’t find <em>that story.</em></h1><p>It may have wandered off the shelf.</p><Link to="/books" className="button button-forest">Back to the books <Icon name="arrow" size={18} /></Link></main>
}

function Storefront() {
  return <><Header /><Routes><Route path="/" element={<HomePage />} /><Route path="/books" element={<CatalogPage />} /><Route path="/books/:bookId" element={<BookDetailsPage />} /><Route path="/cart" element={<CartPage />} /><Route path="/checkout" element={<CheckoutPage />} /><Route path="*" element={<NotFound />} /></Routes><Footer /></>
}

function App() {
  return <BrowserRouter><CartProvider><Storefront /></CartProvider></BrowserRouter>
}

export default App
