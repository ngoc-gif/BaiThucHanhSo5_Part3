const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/supplierController');
const { isLoggedIn } = require('../middleware/auth');

router.get('/', supplierController.index);
router.get('/new', isLoggedIn, supplierController.showForm);
router.post('/', isLoggedIn, supplierController.create);
router.get('/:id/edit', isLoggedIn, supplierController.editForm);
router.put('/:id', isLoggedIn, supplierController.update);
router.delete('/:id', isLoggedIn, supplierController.remove);

module.exports = router;

/**
 * @openapi
 * /suppliers:
 *   get:
 *     summary: Lấy danh sách nhà cung cấp
 *     responses:
 *       200:
 *         description: Danh sách nhà cung cấp
 *   post:
 *     summary: Tạo nhà cung cấp mới
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Supplier'
 *     responses:
 *       201:
 *         description: Tạo thành công
 *
 * /suppliers/{id}:
 *   put:
 *     summary: Cập nhật nhà cung cấp
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
 *             $ref: '#/components/schemas/Supplier'
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *   delete:
 *     summary: Xóa nhà cung cấp
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
