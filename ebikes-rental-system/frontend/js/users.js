async function toggleUser(userId) {
    const res = await apiFetch(`/users/${userId}/toggle`, {
        method: "PUT"
    });
    if (res.success) {
        alert("Đã cập nhật trạng thái hoạt động của tài khoản thành công!");
        location.reload();
    }
}