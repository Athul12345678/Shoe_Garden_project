import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Slider from "react-slick";
import './Userhome.css'; // Keeping your original CSS as is
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import authen from '../context/authen';

export default function UserHome() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentCategory, setCurrentCategory] = useState('all');
    const [message, setMessage] = useState('');
    const [cartProducts, setCartProducts] = useState([]);
    const navigate = useNavigate();
    const login = useContext(authen);

    useEffect(() => {
        fetchProducts();
        fetchCartProducts();
        checkLoginStatus();
    }, []);

    useEffect(() => {
        const results = products.filter(product => {
            if (!product || !product.productname || !product.productbrand || !product.productcategory) {
                return false;
            }
            const matchesSearch = (product.productname && product.productname.toLowerCase().includes(searchTerm.toLowerCase())) ||
                                  (product.productbrand && product.productbrand.toLowerCase().includes(searchTerm.toLowerCase()));
            const matchesCategory = currentCategory === 'all' || (product.productcategory && product.productcategory.toLowerCase() === currentCategory.toLowerCase());
            return matchesSearch && matchesCategory;
        });
        setFilteredProducts(results);
    }, [searchTerm, currentCategory, products]);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:9000/addproduct/display');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const fetchCartProducts = async () => {
        const userId = sessionStorage.getItem('userid');
        if (userId) {
            try {
                const response = await axios.get(`http://localhost:9000/cart/${userId}`);
                setCartProducts(response.data);
            } catch (error) {
                console.error('Error fetching cart products:', error);
            }
        }
    };

    const checkLoginStatus = () => {
        const token = sessionStorage.getItem('token');
        login.setLogin(!!token);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleCategoryClick = (category) => {
        setCurrentCategory(category);
    };

    const handleAddToCart = async (productId) => {
        const userId = sessionStorage.getItem('userid');
        if (!userId) {
            navigate('/login');
            return;
        }

        const isProductInCart = cartProducts.some(cartProduct => cartProduct._id === productId);

        if (isProductInCart) {
            setMessage('Product is already in the cart!');
            setTimeout(() => setMessage(''), 3000); 
            return;
        }

        try {
            await axios.post('http://localhost:9000/cart/addtocart', { userId, productId });
            setMessage('Product added to cart successfully!');
            setTimeout(() => setMessage(''), 3000); 
            fetchCartProducts();
        } catch (error) {
            console.error('Error adding to cart:', error);
            setMessage('Failed to add product to cart.');
            setTimeout(() => setMessage(''), 3000); 
        }
    };

    const handleBuyNow = (productId) => {
        navigate(`/product/${productId}`);
    };

    const handleLogout = () => {
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('userid');
        sessionStorage.removeItem('token');
        login.setLogin(false);
        navigate('/login');
    };

    const brandCards = [
        { name: 'Adidas', image: 'https://e0.pxfuel.com/wallpapers/171/449/desktop-wallpaper-adidas-shoes-logo-neon-adidas-symbol.jpg' },
        { name: 'Nike', image: 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/b37fad17521153.562bb05f79712.gif' },
        { name: 'Puma', image: 'https://i.ytimg.com/vi/UyefASVrtbw/maxresdefault.jpg' },
        { name: 'Reebok', image: 'https://marketingweek.imgix.net/content/uploads/2021/08/16152100/Reebok.png' },
        { name: 'Under Armour', image: 'https://thekickzstand.com.au/wordpress/wp-content/uploads/2021/11/5-2-scaled.jpg' },
    ];

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    const productsToDisplay = filteredProducts.slice(0, 7);

    return (
        <div className="user-home-container">
            {message && <div className="popup-message">{message}</div>}
            <nav className="navbar">
                <div className="navbar-container">
                    <div className="navbar-left">
                        <a href="#" className="logo">Shoe Garden</a>
                    </div>
                    <div className="navbar-middle">
                        <div className="search-container">
                            <i className="fas fa-search search-icon"></i>
                            <input 
                                type="text" 
                                placeholder="Search by name or brand..." 
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                        </div>
                    </div>
                    <div className="navbar-categories">
                        <a href="#" className="category-icon" onClick={() => handleCategoryClick('men')}>
                            <img src="https://rukminim2.flixcart.com/image/850/1000/kz3118w0/shoe/a/7/o/9-anc6-rd-smoky-red-original-imagb69j57gqfcmj.jpeg?q=90&crop=false" alt="Men" />
                            <span>Men</span>
                        </a>
                        <a href="#" className="category-icon" onClick={() => handleCategoryClick('women')}>
                            <img src="https://as2.ftcdn.net/v2/jpg/01/21/90/01/1000_F_121900128_gKj5GWuSqSRGZoL8viTC6oWJkj3clTwI.jpg" alt="Women" />
                            <span>Women</span>
                        </a>
                        <a href="#" className="category-icon" onClick={() => handleCategoryClick('kids')}>
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzX0BIfa_WhBGmd-BGEQQ4ry3kenlQgRL_YA&s" alt="Kids" />
                            <span>Kids</span>
                        </a>
                    </div>
                    <div className="navbar-right">
                        <a href="#" onClick={() => handleCategoryClick('all')}>Home</a>
                        <a href="#">Collections</a>
                        <a href="cartdisplay">Cart</a>
                        <a href="#">About Us</a>
                        {login.status ? (
                            <a href="#" onClick={handleLogout}>Logout</a>
                        ) : (
                            <Link to="/login">Register/Login</Link>
                        )}
                    </div>
                </div>
            </nav>

            <div className="product-container">
                {productsToDisplay.map((product) => (
                    <div key={product._id} className="product-card">
                        <img 
                            src={`http://localhost:9000/${product.productimage}`} 
                            alt={product.productname} 
                            className="product-image"
                        />
                        <h3>{product.productname}</h3>
                        <p>Price: ${product.productprice}</p>
                        <p>Size: {product.productsize}</p>
                        <p>Brand: {product.productbrand}</p>
                        <p>Category: {product.productcategory}</p>
                        <div className="button-container">
                            <button onClick={() => handleAddToCart(product._id)}>Add to Cart</button>
                            <button onClick={() => handleBuyNow(product._id)}>Buy Now</button>
                        </div>
                    </div>
                ))}
                {filteredProducts.length > 7 && (
                    <div className="view-all-card">
                        <Link to="/allproducts" className="view-all-link">
                            <div className="view-all-content">
                                <span>View All Products</span>
                                <i className="fas fa-chevron-right view-all-icon"></i>
                            </div>
                        </Link>
                    </div>
                )}
            </div>

            <div className="brand-carousel">
                <h2>Our Brands</h2>
                <Slider {...sliderSettings}>
                    {brandCards.map((brand, index) => (
                        <div key={index} className="brand-card">
                            <img src={brand.image} alt={brand.name} className="brand-image" />
                            <h3>{brand.name}</h3>
                        </div>
                    ))}
                </Slider>
            </div>

            <footer className="footer">
                <div className="footer-content">
                    <div className="footer-section">
                        <h3>About Us</h3>
                        <p>Shoe Garden is your one-stop shop for all your footwear needs.</p>
                    </div>
                    <div className="footer-section">
                        <h3>Quick Links</h3>
                        <ul>
                            <li><a href="/privacy-policy">Privacy Policy</a></li>
                            <li><a href="/terms-conditions">Terms & Conditions</a></li>
                        </ul>
                    </div>
                    <div className="footer-section">
                        <h3>Connect With Us</h3>
                        <div className="social-icons">
                            <a href="#" className="social-icon"><i className="fab fa-facebook-f"></i></a>
                            <a href="#" className="social-icon"><i className="fab fa-twitter"></i></a>
                            <a href="#" className="social-icon"><i className="fab fa-instagram"></i></a>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; 2024 Shoe Garden India Marketing Pvt Ltd. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}