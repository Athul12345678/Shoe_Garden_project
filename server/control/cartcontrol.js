const main = require('../model/database')
main().catch(err => console.log(err))
const cartModel = require('../model/cartmodel')
const productModel = require('../model/productmodel')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const addToCart = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    let cart = await cartModel.findOne({ userId: userId });
    const product = await productModel.findById(productId);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    if (product.productquantity <= 0) {
      return res.status(400).json({ error: 'Product is out of stock' });
    }

    if (cart) {
      const productIndex = cart.products.findIndex(p => p.productId == productId);

      if (productIndex > -1) {
        if (cart.products[productIndex].quantity < product.productquantity) {
          cart.products[productIndex].quantity += 1;
        } else {
          return res.status(400).json({ error: 'Cannot add more of this item' });
        }
      } else {
        cart.products.push({ productId, quantity: 1 });
      }
    } else {
      cart = new cartModel({ userId: userId, products: [{ productId, quantity: 1 }] });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add product to cart' });
  }
};

const getCartItems = async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await cartModel.findOne({ userId: userId });
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    const cartItemsWithDetails = await Promise.all(cart.products.map(async (item) => {
      const product = await productModel.findById(item.productId);
      return {
        productId: item.productId,
        quantity: item.quantity,
        productname: product.productname,
        productprice: product.productprice,
        productimage: product.productimage,
        productsize: product.productsize,
        productquantity: product.productquantity
      };
    }));

    res.status(200).json({ products: cartItemsWithDetails });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch cart items' });
  }
};

const removeFromCart = async (req, res) => {
  const { userId, productId } = req.params;

  try {
    const cart = await cartModel.findOne({ userId: userId });
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    cart.products = cart.products.filter(item => item.productId != productId);
    await cart.save();

    res.status(200).json({ message: 'Item removed from cart' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove item from cart' });
  }
};

const updateQuantity = async (req, res) => {
  const { userId, productId } = req.params;
  const { quantity } = req.body;

  try {
    const cart = await cartModel.findOne({ userId: userId });
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    const productIndex = cart.products.findIndex(item => item.productId == productId);
    if (productIndex === -1) {
      return res.status(404).json({ error: 'Product not found in cart' });
    }

    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    if (quantity > product.productquantity) {
      return res.status(400).json({ error: 'Requested quantity exceeds available stock' });
    }

    cart.products[productIndex].quantity = quantity;
    await cart.save();

    res.status(200).json({ message: 'Quantity updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update quantity' });
  }
};

const createCheckoutSession = async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await cartModel.findOne({ userId }).populate('products.productId');
    
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: cart.products.map(item => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.productId.productname,
          },
          unit_amount: Math.round(item.productId.productprice * 100),
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: 'http://localhost:5173/payment-success?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'http://localhost:5173/payment-failed',
      client_reference_id: userId,
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: error.message });
  }
};

const verifyPayment = async (req, res) => {
  const { sessionId } = req.params;
  
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.payment_status === 'paid') {
      const cart = await cartModel.findOne({ userId: session.client_reference_id }).populate('products.productId');
      
      if (cart) {
        await updateProductQuantitiesAndClearCart(cart);
      }

      res.json({ success: true });
    } else {
      res.json({ success: false, status: session.payment_status });
    }
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(400).json({ success: false, error: 'Unable to verify payment' });
  }
};

const updateProductQuantitiesAndClearCart = async (cart) => {
  const updatePromises = cart.products.map(async (item) => {
    const product = await productModel.findById(item.productId);
    if (product) {
      product.productquantity = Math.max(0, product.productquantity - item.quantity);
      return product.save();
    }
  });

  await Promise.all(updatePromises);

  // Clear the cart
  cart.products = [];
  await cart.save();
};

module.exports = { 
  addToCart, 
  getCartItems, 
  removeFromCart, 
  updateQuantity, 
  createCheckoutSession, 
  verifyPayment 
};