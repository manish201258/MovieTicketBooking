const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
require('dotenv').config();


const userSchema = new mongoose.Schema({
    username: {
        type: String,
         
    },
    email: {
        type: String,
         
    },
    phone: {
        type: String,
         
    },
    password: {
        type: String,
         
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
    },
    tickets: [{
        image:{type: String,  },
        movieTitle: { type: String,   },
        date: { type: String,   },
        time: { type: String,   },
        price: { type: String,   },
        seats: [{ type: String,   }],
        theaterName: { type: String,   },
        ticketStatus:{ type: String}
    }]
});

// Pre middleware
userSchema.pre("save", async function(next) {
    next();
});

// JWT token
userSchema.methods.generateToken = async function() {
    try {
        return jwt.sign({
            userId: this._id.toString(),
            email: this.email,
            isAdmin: this.isAdmin
        }, 
        process.env.SECRET_KEY, {
            expiresIn: "7d",
            
        });
    } catch (error) {
        console.error(error);
    }
};

// Define model
const User = mongoose.model("User", userSchema);
module.exports = User;
