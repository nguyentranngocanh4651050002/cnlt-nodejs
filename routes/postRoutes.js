const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

// Trang chủ
router.get("/", postController.index);

// FORM THÊM BÀI 
router.get("/create", postController.createForm);

// Xử lý thêm bài
router.post("/create", postController.createPost);

// Chi tiết
router.get("/detail/:id", postController.detail);

// Form sửa
router.get("/edit/:id", postController.editForm);

// Xử lý sửa
router.post("/edit/:id", postController.updatePost);

// Xóa
router.get("/delete/:id", postController.deletePost);

module.exports = router;