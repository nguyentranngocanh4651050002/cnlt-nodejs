async function loadNews() {

    const res =
    await fetch(
        `${BASE_URL}/news`
    );

    const news =
    await res.json();

    let html = "";

    news.forEach(item => {

        html += `
        <div class="card mb-3">
            <div class="card-body">
                <h4>${item.title}</h4>
                <p>${item.content}</p>
            </div>
        </div>
        `;

    });

    document.getElementById(
        "newsList"
    ).innerHTML =
    html;

}

loadNews();