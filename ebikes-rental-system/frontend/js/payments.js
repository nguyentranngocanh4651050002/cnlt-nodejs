async function loadPayments() {

    const res =
    await fetch(
        `${BASE_URL}/payments`
    );

    const payments =
    await res.json();

    let html = "";

    payments.forEach(item => {

        html += `
        <tr>
            <td>${item._id}</td>
            <td>${item.amount}</td>
            <td>${item.paymentMethod}</td>
            <td>${item.status}</td>
        </tr>
        `;

    });

    document.getElementById(
        "paymentTable"
    ).innerHTML = html;

}

loadPayments();