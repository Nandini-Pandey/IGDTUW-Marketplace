import React, { useState, useMemo, useEffect } from 'react';
import './CategoryPage.css';
import NewNavbar from '../../components/newNavbar/newNavbar';
import { Link } from 'react-router-dom';

const CategoryPage = () => {
  console.log('CategoryPage component rendered');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedAccommodation, setSelectedAccommodation] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All');
  const [selectedCondition, setSelectedCondition] = useState('All');
  const [sortBy, setSortBy] = useState('name-asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const productsPerPage = 9;

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      setError(null);
      console.log('Fetching products...');
      
      // Use the full URL when in development
      const API_URL = import.meta.env.DEV ? 'http://localhost:3000' : '';
      const response = await fetch(`${API_URL}/api/products`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Fetched products:', data.length);
      
      if (!Array.isArray(data)) {
        throw new Error('Expected array of products but got: ' + typeof data);
      }
      
      setProducts(data);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log('CategoryPage mounted');
    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    console.log('Filtering products:', products);
    return products
      .filter((product) => {
        const matchesSearch =
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory =
          selectedCategory === 'All' || product.category === selectedCategory;
        const matchesAccommodation =
          selectedAccommodation === 'All' ||
          product.accommodationType === selectedAccommodation;
        const matchesYear = selectedYear === 'All' || product.year === selectedYear;
        const matchesCondition =
          selectedCondition === 'All' || product.condition === selectedCondition;

        return (
          matchesSearch &&
          matchesCategory &&
          matchesAccommodation &&
          matchesYear &&
          matchesCondition
        );
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'name-asc':
            return a.name.localeCompare(b.name);
          case 'name-desc':
            return b.name.localeCompare(a.name);
          case 'year-asc':
            return a.year.localeCompare(b.year);
          case 'year-desc':
            return b.year.localeCompare(a.year);
          case 'price-asc':
            return a.price - b.price;
          case 'price-desc':
            return b.price - a.price;
          default:
            return 0;
        }
      });
  }, [products, searchQuery, selectedCategory, selectedAccommodation, selectedYear, selectedCondition, sortBy]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  console.log('Loading:', isLoading);
  console.log('Error:', error);
  console.log('Filtered products:', filteredProducts);
  console.log('Current products:', currentProducts);

  const FilterControls = () => {
    return (
      <div className="filter-section">
        <div className="filter-buttons">
          <button className={`filter-button ${selectedCategory === 'All' ? 'active' : ''}`} onClick={() => {
            setSelectedCategory('All');
            setSelectedAccommodation('All');
            setSelectedYear('All');
            setSelectedCondition('All');
          }}>Clear Filters</button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div>
        <NewNavbar />
        <div className="loading-container">
          <h2>Loading products...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <NewNavbar />
        <div className="error-container">
          <h2>Error: {error}</h2>
        </div>
      </div>
    );
  }

  if (filteredProducts.length === 0) {
    return (
      <div>
        <NewNavbar />
        <div className="no-products" style={{ textAlign: 'center', marginTop: '50px' }}>
          <h2>No products found matching your criteria</h2>
          <button onClick={() => {
            setSearchQuery('');
            setSelectedCategory('All');
            setSelectedAccommodation('All');
            setSelectedYear('All');
            setSelectedCondition('All');
          }}>Clear Filters</button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <NewNavbar />
      <div className="controls-container">
        <div className="search-bar-container">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search products..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="search-button">🔍</button>
          </div>
        </div>

        <div className="filter-controls">
          <select className="filter-select" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="All">All Categories</option>
            <option value="Books">Books</option>
            <option value="Lab Equipment">Lab Equipment</option>
            <option value="Electronics">Electronics</option>
            <option value="Projects">Projects</option>
            <option value="Hostel Supplies">Hostel Supplies</option>
            <option value="Notes">Notes</option>
          </select>

          <select className="filter-select" value={selectedAccommodation} onChange={(e) => setSelectedAccommodation(e.target.value)}>
            <option value="All">All Accommodations</option>
            <option value="Hosteller">Hosteller</option>
            <option value="Day Scholar">Day Scholar</option>
          </select>

          <select className="filter-select" value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
            <option value="All">All Years</option>
            <option value="2025">2025</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
          </select>

          <select className="filter-select" value={selectedCondition} onChange={(e) => setSelectedCondition(e.target.value)}>
            <option value="All">All Conditions</option>
            <option value="New">New</option>
            <option value="Second Hand">Second Hand</option>
          </select>

          <select className="sort-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="year-asc">Year (Oldest First)</option>
            <option value="year-desc">Year (Newest First)</option>
            <option value="name-asc">Name (A to Z)</option>
            <option value="name-desc">Name (Z to A)</option>
            <option value="price-asc">Price (Low to High)</option>
            <option value="price-desc">Price (High to Low)</option>
          </select>
        </div>
      </div>

      <div className="products-grid">
        {currentProducts.map((product) => (
          <div key={product._id} className="product-card">
            <div className="product-image">
              <img src={product.img} alt={product.name} />
            </div>
            <div className="product-info">
              <h3 className="product-title">{product.name}</h3>
              <p><strong>Accommodation:</strong> {product.accommodationType}</p>
              <p><strong>Condition:</strong> {product.condition}</p>
              <p className="product-description">{product.description}</p>
              <div className="product-price-buy">
                <p className="product-price">₹{product.price.toLocaleString('en-IN')}</p>
                <Link to={`/product/${product._id}`} className="buy-now-button">Buy Now</Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="pagination-controls">
          <button className="pagination-button" onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
            <button key={number} className={`page-number ${currentPage === number ? 'active' : ''}`} onClick={() => paginate(number)}>
              {number}
            </button>
          ))}
          <button className="pagination-button" onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
