import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CartDisplay.css';
import { loadStripe } from '@stripe/stripe-js';

export default function CartDisplay() {
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();
    const userId = sessionStorage.getItem('userid');

    useEffect(() => {
        if (!userId) {
            navigate('/login');
            return;
        }
        fetchCartItems();
    }, [userId, navigate]);

    const fetchCartItems = async () => {
        try {
            const response = await axios.get(`http://localhost:9000/cart/getcart/${userId}`);
            setCartItems(response.data.products);
        } catch (error) {
            console.error('Error fetching cart items:', error);
        }
    };

    const handleRemoveItem = async (productId) => {
        try {
            await axios.delete(`http://localhost:9000/cart/removefromcart/${userId}/${productId}`);
            fetchCartItems();
        } catch (error) {
            console.error('Error removing item from cart:', error);
        }
    };

    const handleUpdateQuantity = async (productId, newQuantity, availableQuantity) => {
        if (newQuantity < 1 || newQuantity > availableQuantity) return;
        try {
            await axios.put(`http://localhost:9000/cart/updatequantity/${userId}/${productId}`, { quantity: newQuantity });
            fetchCartItems();
        } catch (error) {
            console.error('Error updating item quantity:', error);
        }
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => {
            const price = parseFloat(item.productprice) || 0;
            return total + (price * item.quantity);
        }, 0).toFixed(2);
    };

    const makepayment = async () => {
        try {
            const stripe = await loadStripe("pk_test_51PqY8UP5dEqkuoB5R0w71OnnVfHQaIzwmMYDAm7n0meF8qyS7I2jwxrOgR4uJlKwkw8wSC5YgBPleEvVmVu5GuCh00DNf1BftD");
            
            const response = await axios.post(`http://localhost:9000/cart/create-checkout-session/${userId}`);
            
            const result = await stripe.redirectToCheckout({
                sessionId: response.data.id
            });
    
            if (result.error) {
                console.error(result.error);
            }
        } catch (error) {
            console.error('Error in payment process:', error);
        }
    };

    const handleBackToHome = () => {
        navigate('/'); // Assuming '/' is your home page route
    };

    return (
        <div className="cart-display-container">
            <button className="back-button" onClick={handleBackToHome}>Back to Home</button>
            <h2>Your Shopping Cart</h2>
            {cartItems.length === 0 ? (
                <p className="empty-cart-message">Your cart is empty</p>
            ) : (
                <div className="cart-items-grid">
                    {cartItems.map((item) => (
                        <div key={item.productId} className="cart-item-card">
                            <img src={`http://localhost:9000/${item.productimage}`} alt={item.productname} className="cart-item-image" />
                            <div className="cart-item-details">
                                <h3>{item.productname}</h3>
                                <p className="item-size">Size: {item.productsize}</p>
                                <p className="item-price">${parseFloat(item.productprice).toFixed(2)}</p>
                                {item.productquantity > 0 ? (
                                    <div className="quantity-control">
                                        <button onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1, item.productquantity)}>-</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1, item.productquantity)}>+</button>
                                    </div>
                                ) : (
                                    <p className="out-of-stock">Out of Stock</p>
                                )}
                            </div>
                            <button className="remove-item" onClick={() => handleRemoveItem(item.productId)}>Remove</button>
                        </div>
                    ))}
                </div>
            )}
            {cartItems.length > 0 && (
                <div className="cart-summary">
                    <h3>Total: ${calculateTotal()}</h3>
                    <button className="checkout-button" onClick={makepayment} disabled={cartItems.some(item => item.productquantity === 0)}>
                        Proceed to Checkout
                    </button>
                </div>
            )}
        </div>
    );
}