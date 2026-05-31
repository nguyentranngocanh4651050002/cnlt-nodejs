function loadNavbar() {

    const navbar = `

    <nav class="navbar navbar-expand-lg navbar-dark bg-black">

        <div class="container">

            <a class="navbar-brand text-warning"
               href="dashboard.html">

                E-BIKES ADMIN

            </a>

            <button
                class="navbar-toggler"
                data-bs-toggle="collapse"
                data-bs-target="#menu">

                <span class="navbar-toggler-icon"></span>

            </button>

            <div
                class="collapse navbar-collapse"
                id="menu">

                <ul class="navbar-nav ms-auto">

                    <li class="nav-item">
                        <a class="nav-link"
                           href="dashboard.html">
                           Dashboard
                        </a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link"
                           href="users.html">
                           Người dùng
                        </a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link"
                           href="bikes.html">
                           Xe điện
                        </a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link"
                           href="rentals.html">
                           Đơn thuê
                        </a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link"
                           href="gps-monitor.html">
                           GPS
                        </a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link"
                           href="#"
                           onclick="logout()">
                           Đăng xuất
                        </a>
                    </li>

                </ul>

            </div>

        </div>

    </nav>

    `;

    document.getElementById(
        "navbar-container"
    ).innerHTML = navbar;
}

loadNavbar();