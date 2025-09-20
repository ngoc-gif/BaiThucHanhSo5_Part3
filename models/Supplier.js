const mongoose = require('mongoose');

/**
 * @openapi
 * components:
 *  schemas:
 *    Supplier:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *        address:
 *          type: string
 *        phone:
 *          type: string
 */

const supplierSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: String,
  phone: String
}, { timestamps: true });

module.exports = mongoose.model('Supplier', supplierSchema);
