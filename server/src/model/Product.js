const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
	prodName: { type: String },
	prodCity: { type: String,
    enum: [
      'lyon',
      'paris',
      'marseille',
      'toulouse',
      'lille',
      'bordeau'
    ]
  },
	prodPrice: { type: String }
});

module.exports = mongoose.model('Product', productSchema);