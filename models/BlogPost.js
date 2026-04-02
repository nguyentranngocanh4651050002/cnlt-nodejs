const posts = [
    {
        id: 1,
        title: "Exciter",
        content: "Xe côn tay thể thao",
        image: "/images/ex.jpg",
        createdAt: new Date().toLocaleString("vi-VN")
    },
    {
        id: 2,
        title: "Sirius",
        content: "Xe số, được ưa chuộng, dễ sử dụng",
        image: "/images/sr.jpg"
        createdAt: new Date().toLocaleString("vi-VN")
    }
];

class BlogPost {
    static getAll() {
        return posts;
    }

    static getById(id) {
        return posts.find(post => post.id == id);
    }

    static create(title, content, image) {
        const newPost = {
            id: posts.length + 1,
            title,
            content,
            image,
            createdAt: new Date().toLocaleString("vi-VN")
        };
        posts.push(newPost);
    }

    static update(id, title, content, image) {
        const post = posts.find(post => post.id == id);
        if (post) {
            post.title = title;
            post.content = content;
            post.image = image;
        }
    }

    static delete(id) {
        const index = posts.findIndex(post => post.id == id);
        if (index !== -1) posts.splice(index, 1);
    }
}

module.exports = BlogPost;