const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  googleId: { 
    type: String, 
    unique: true, 
    sparse: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String,
    required: function() { 
      return !this.googleId;
    }
  },
  name: { 
    type: String, 
    required: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Add pre-save middleware to log the document before saving
UserSchema.pre('save', function(next) {
  console.log('Saving user:', this);
  next();
});

module.exports = mongoose.model("User", UserSchema);