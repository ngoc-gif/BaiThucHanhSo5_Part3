const mongoose = require('mongoose');

/**
 * @openapi
 * components:
 *  schemas:
 *    Product:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *        price:
 *          type: number
 *        quantity:
 *          type: integer
 *        supplier:
 *          type: string
 */

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, default: 0 },
  quantity: { type: Number, default: 0 },
  supplier: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier', required: true },
  refCode: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
