const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    enum: ["face", "hair", "nail", "other"]  // add more if needed
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  duration: {
    type: mongoose.Schema.Types.Mixed, // number or "2.5 hour"
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  desc: {
    type: String,
    default: ""
  },
  image: {
    type: String,
    required: true,
    default : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToNj3KVn4EbrLuoJ0qYoLWQ4LSiQNWAjQsNQ&s"
  }
}, { timestamps: true });

module.exports = mongoose.model("Service", ServiceSchema);
