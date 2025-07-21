// controllers
const users = require('../Models/userSchema')
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
    console.log("inside register function");
    const { Username, email, password, role = 'user' } = req.body // Add role field
    try {
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            res.status(406).json("user already exist..please login")
        } else {
            const newUser = new users({
                Username, email, password, role // Include role in user creation
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
    } catch (err) {
        res.status(401).json(err)
    }
}

exports.login = async (req, res) => {
    const { email, password } = req.body;
    console.log("Login request:", email, password);

    try {
        const existingUser = await users.findOne({ email });
        console.log("Found user in DB:", existingUser);

        if (existingUser && existingUser.password === password) {
            // Include role in JWT token
            const token = jwt.sign(
                { 
                    userId: existingUser._id, 
                    role: existingUser.role,
                    email: existingUser.email 
                }, 
                process.env.jwt_secret,
                { expiresIn: '24h' }
            );
            
            return res.status(200).json({ 
                user: existingUser, 
                token,
                role: existingUser.role // Send role back to frontend
            });
        } else {
            return res.status(406).json("Invalid email or password");
        }
    } catch (err) {
        console.error("Login error:", err);
        return res.status(500).json("Server error");
    }
};

// add cart item
exports.addToCart = async (req, res) => {
    const { userId, productId, quantity } = req.body;

    try {
        const user = await users.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        const existingItem = user.cartitems.find(item =>
            item.productId.toString() === productId
        );

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            user.cartitems.push({ productId, quantity });
        }

        await user.save();
        res.status(200).json({ message: "Cart updated", cart: user.cartitems });

    } catch (err) {
        res.status(500).json({ message: "Error updating cart", error: err.message });
    }
};

// geet cart item

exports.getCartItems = async (req, res) => {
    try {
        const { userId } = req.params;
        
        const user = await users.findById(userId).populate('cartitems.productId');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user.cartitems);
    } catch (error) {
        res.status(500).json({ message: "Error fetching cart items", error: error.message });
    }
};

// delet cart item

exports.deleteCartItem = async (req, res) => {
  const { userId, productId } = req.params;

  try {
    const user = await users.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Filter out the product from the cart
    user.cartitems = user.cartitems.filter(item =>
      item.productId.toString() !== productId
    );

    await user.save();
    res.status(200).json({ message: "Cart item deleted", cart: user.cartitems });

  } catch (err) {
    res.status(500).json({ message: "Error deleting item", error: err.message });
  }
};

