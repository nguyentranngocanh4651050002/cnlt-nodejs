async function submitReview(bikeId, so_sao, binh_luan) {
    const res = await apiFetch("/reviews", {
        method: "POST",
        body: { id_xe: bikeId, so_sao, binh_luan }
    });
    if (res.success) {
        alert("Cảm ơn bạn đã gửi đánh giá phản hồi!");
        location.reload();
    } else {
        alert(res.message);
    }
}