async function loadProfile() {

    const res =
    await fetch(
        `${BASE_URL}/users/profile`,
        {
            headers:getHeaders()
        }
    );

    const user =
    await res.json();

    document.getElementById(
        "fullName"
    ).value =
    user.fullName;

    document.getElementById(
        "email"
    ).value =
    user.email;

}

loadProfile();