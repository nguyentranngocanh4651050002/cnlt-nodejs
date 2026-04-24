let students = require("../data/students");
let idCounter = 1;

function validate(student) {
    if (!student.name || student.name.length < 2) return "Name >= 2 ký tự";
    if (!/\S+@\S+\.\S+/.test(student.email)) return "Email không hợp lệ";
    if (students.find(s => s.email === student.email)) return "Email trùng";
    if (student.age < 16 || student.age > 60) return "Age phải 16-60";
    return null;
}

// CREATE
exports.create = (req, res) => {
    const error = validate(req.body);
    if (error) return res.status(400).json({ message: error });

    const student = {
        id: idCounter++,
        ...req.body,
        isDeleted: false
    };

    students.push(student);
    res.json(student);
};

// GET ALL
exports.getAll = (req, res) => {
    let result = students.filter(s => !s.isDeleted);

    if (req.query.name) {
        result = result.filter(s =>
            s.name.toLowerCase().includes(req.query.name.toLowerCase())
        );
    }

    if (req.query.class) {
        result = result.filter(s => s.class === req.query.class);
    }

    if (req.query.sort === "age_desc") {
        result.sort((a, b) => b.age - a.age);
    }

    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || result.length;

    const start = (page - 1) * limit;
    const data = result.slice(start, start + limit);

    res.json({
        page,
        limit,
        total: result.length,
        data
    });
};

// GET ONE
exports.getOne = (req, res) => {
    const student = students.find(
        s => s.id == req.params.id && !s.isDeleted
    );

    if (!student) {
        return res.status(404).json({ message: "Không tìm thấy" });
    }

    res.json(student);
};

// UPDATE (FIX EMAIL TRÙNG)
exports.update = (req, res) => {
    const student = students.find(
        s => s.id == req.params.id && !s.isDeleted
    );

    if (!student) {
        return res.status(404).json({ message: "Không tìm thấy" });
    }

    if (req.body.email) {
        const exist = students.find(
            s => s.email === req.body.email && s.id != student.id
        );
        if (exist) {
            return res.status(400).json({ message: "Email trùng" });
        }
    }

    Object.assign(student, req.body);
    res.json(student);
};

// DELETE
exports.remove = (req, res) => {
    const student = students.find(s => s.id == req.params.id);

    if (!student) {
        return res.status(404).json({ message: "Không tìm thấy" });
    }

    student.isDeleted = true;
    res.json({ message: "Đã xóa mềm" });
};

// STATS
exports.stats = (req, res) => {
    const total = students.length;
    const active = students.filter(s => !s.isDeleted).length;
    const deleted = students.filter(s => s.isDeleted).length;

    const activeStudents = students.filter(s => !s.isDeleted);
    const avg =
        activeStudents.reduce((sum, s) => sum + s.age, 0) /
            activeStudents.length || 0;

    res.json({
        total,
        active,
        deleted,
        averageAge: avg
    });
};

// STATS CLASS
exports.statsByClass = (req, res) => {
    const map = {};

    students
        .filter(s => !s.isDeleted)
        .forEach(s => {
            map[s.class] = (map[s.class] || 0) + 1;
        });

    res.json(
        Object.keys(map).map(c => ({
            class: c,
            count: map[c]
        }))
    );
};