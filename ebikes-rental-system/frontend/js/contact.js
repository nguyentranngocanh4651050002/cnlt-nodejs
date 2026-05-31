document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const tieu_de = document.getElementById("tieu_de").value;
            const noi_dung = document.getElementById("noi_dung").value;

            const res = await apiFetch("/contacts", {
                method: "POST",
                body: { tieu_de, noi_dung }
            });

            if (res.success) {
                alert("Form liên hệ góp ý của bạn đã được gửi thành công!");
                contactForm.reset();
            }
        });
    }
});