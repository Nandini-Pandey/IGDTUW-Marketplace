import React, { useState, useEffect, useMemo } from 'react';
import './CategoryPage.css';
import NewNavbar from './newNavbar';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CategoryPage = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedAccommodation, setSelectedAccommodation] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All');
  const [selectedCondition, setSelectedCondition] = useState('All');
  const [sortBy, setSortBy] = useState('name-asc');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://updated-6tm3.onrender.com/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
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

        return matchesSearch && matchesCategory && matchesAccommodation && matchesYear && matchesCondition;
      })
      .sort((a, b) => {
        const [field, order] = sortBy.split('-');
        if (field === 'name') {
          return order === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
        } else if (field === 'price') {
          return order === 'asc' ? a.price - b.price : b.price - a.price;
        } else if (field === 'year') {
          return order === 'asc' ? a.year.localeCompare(b.year) : b.year.localeCompare(a.year);
        }
        return 0;
      });
  }, [products, searchQuery, selectedCategory, selectedAccommodation, selectedYear, selectedCondition, sortBy]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
          <button className="pagination-button" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
            <button key={number} className={`page-number ${currentPage === number ? 'active' : ''}`} onClick={() => handlePageChange(number)}>
              {number}
            </button>
          ))}
          <button className="pagination-button" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
