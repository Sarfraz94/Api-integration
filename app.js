
const baseUrl = "https://fakestoreapi.noksha.dev";
const display = document.getElementById("display");

async function getUsers() {
    try {
        const response = await fetch(`${baseUrl}/api/users`);

        if (!response.ok) {
            throw new Error("Unable to load users");
        }

        const result = await response.json();

        display.innerHTML = "";

        for (const user of result.data) {
            display.innerHTML += `
                <div class="col-12 col-md-6 col-lg-4">
                    <div class="user-card">
                        <div class="user-avatar">
                            ${user.name.charAt(0).toUpperCase()}
                        </div>

                        <h3>${user.name}</h3>
                        <p class="user-email">${user.email}</p>

                        <a
                            href="user-detail.html?id=${encodeURIComponent(user._id)}"
                            class="profile-btn">
                            View Profile
                        </a>
                    </div>
                </div>
            `;
        }
    } catch (error) {
        display.innerHTML = `
            <div class="col-12">
                <p class="error-message">
                    Users could not be loaded. Please try again.
                </p>
            </div>
        `;
        console.log(error);
    }
}

getUsers();
