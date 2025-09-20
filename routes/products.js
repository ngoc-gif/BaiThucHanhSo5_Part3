const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { isLoggedIn } = require('../middleware/auth');

router.get('/', productController.index);
router.get('/new', isLoggedIn, productController.showForm);
router.post('/', isLoggedIn, productController.create);
router.get('/:id/edit', isLoggedIn, productController.showForm);
router.put('/:id', isLoggedIn, productController.update);
router.delete('/:id', isLoggedIn, productController.remove);

module.exports = router;

/**
 * @openapi
 * /products:
 *   get:
 *     summary: Lấy danh sách sản phẩm
 *     parameters:
 *       - in: query
 *         name: supplierId
 *         schema:
 *           type: string
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Danh sách sản phẩm
 *   post:
 *     summary: Tạo sản phẩm mới
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Tạo thành công
 *
 * /products/{id}:
 *   put:
 *     summary: Cập nhật sản phẩm
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *   delete:
 *     summary: Xóa sản phẩm
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Xóa thành công
 */
