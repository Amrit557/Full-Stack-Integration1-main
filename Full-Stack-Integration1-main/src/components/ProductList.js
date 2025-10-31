import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ProductList.css"; // We'll create this CSS file

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3000/api/products")
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError("Error fetching products");
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="loading">Loading products...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="container">
      <h2 className="title">Our Products</h2>
      <div className="product-grid">
        {products.map(p => (
          <div key={p.id} className="product-card">
            <div className="product-image">
              <img src={`https://via.placeholder.com/150?text=${p.name}`} alt={p.name} />
            </div>
            <div className="product-info">
              <h3>{p.name}</h3>
              <p className="price">₹{p.price}</p>
              <button className="buy-btn">Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
