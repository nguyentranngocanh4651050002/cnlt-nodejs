const BlogPost = require("../models/BlogPost");

exports.index = (req, res) => {
    const posts = BlogPost.getAll();
    res.render("index", { posts });
};

exports.createForm = (req, res) => {
    res.render("create");
};

exports.createPost = (req, res) => {
    BlogPost.create(req.body.title, req.body.content, req.body.image);
    res.redirect("/");
};

exports.detail = (req, res) => {
    const post = BlogPost.getById(req.params.id);
    res.render("detail", { post });
};

exports.editForm = (req, res) => {
    const post = BlogPost.getById(req.params.id);
    res.render("edit", { post });
};

exports.updatePost = (req, res) => {
    BlogPost.update(
        req.params.id,
        req.body.title,
        req.body.content,
        req.body.image
    );
    res.redirect("/");
};

exports.deletePost = (req, res) => {
    BlogPost.delete(req.params.id);
    res.redirect("/");
};