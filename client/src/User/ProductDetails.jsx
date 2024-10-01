import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ProductDetails.css';

export default function ProductDetails() {
    const [product, setProduct] = useState(null);
    const [selectedSize, setSelectedSize] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetchProductDetails();
    }, [id]);

    const fetchProductDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:9000/addproduct/edit/${id}`);
            setProduct(response.data[0]);
        } catch (error) {
            console.error('Error fetching product details:', error);
        }
    };

    const handleAddToBag = () => {
        console.log('Added to bag:', product._id, 'Size:', selectedSize);
    };

    const handleAddToFavorite = () => {
        console.log('Added to favorites:', product._id);
    };

    const handleBuyNow = () => {
        console.log('Buy now:', product._id, 'Size:', selectedSize);
    };

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="product-details-page">
            <nav className="product-details-nav">
                <Link to="/" className="home-link">Home</Link>
            </nav>
            <div className="product-details-container">
                <div className="product-image-section">
                    <img src={`http://localhost:9000/${product.productimage}`} alt={product.productname} />
                    <button onClick={handleBuyNow} className="buy-now-button" disabled={!selectedSize}>Buy Now</button>
                </div>
                <div className="product-info-section">
                    <h1>{product.productname}</h1>
                    <p className="product-brand">Brand: {product.productbrand}</p>
                    <p className="product-price">Price: ${product.productprice}</p>
                    <div className="size-selector">
                        <label htmlFor="size-select">Select Size:</label>
                        <select 
                            id="size-select" 
                            value={selectedSize} 
                            onChange={(e) => setSelectedSize(e.target.value)}
                        >
                            <option value="">Choose a size</option>
                            {product.productsize.split(',').map((size) => (
                                <option key={size.trim()} value={size.trim()}>{size.trim()}</option>
                            ))}
                        </select>
                    </div>
                    <div className="button-container">
                        <button onClick={handleAddToBag} className="add-to-bag-button" disabled={!selectedSize}>Add to Bag</button>
                        <button onClick={handleAddToFavorite} className="add-to-favorite-button">Add to Favorite</button>
                    </div>
                    <div className="product-description">
                        <h2>Product Description</h2>
                        <p>{product.productdescription || 'No description available.'}</p>
                    </div>
                    <div className="shipping-returns">
                        <h2>Shipping and Returns</h2>
                        <p>
                            Free return for all qualifying orders within 14 days of your order delivery date. Visit our <a href="#" className="policy-link">Return Policy</a> for more information.
                            <br /><br />
                            For any queries, please contact Customer Service at <a href="tel:080-35353535" className="policy-link">080-35353535</a> or via <a href="mailto:customercareindia@puma.com" className="policy-link">customercareindia@puma.com</a>.
                        </p>
                    </div>
                    <div className="user-reviews">
                        <h2>User Reviews</h2>
                        <p>No reviews yet.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
