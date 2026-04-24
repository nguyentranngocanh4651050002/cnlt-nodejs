const express = require("express");
const router = express.Router();

const controller = require("../controllers/student.controller");
const { requireLogin } = require("../middleware/auth.middleware");

router.use(requireLogin);

router.get("/", controller.getAll);
router.get("/stats", controller.stats);
router.get("/stats/class", controller.statsByClass);
router.get("/:id", controller.getOne);

router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.remove);

module.exports = router;