
const baseUrl = "https://fakestoreapi.noksha.dev";
const display = document.getElementById("display");

// URL se user ki ID lena
const params = new URLSearchParams(window.location.search);
const userId = params.get("id");

async function getUserDetails() {
    if (!userId) {
        display.innerHTML = "<p>No user ID was provided.</p>";
        return;
    }

    try {
        const response = await fetch(
            `${baseUrl}/api/users/${encodeURIComponent(userId)}`
        );

        if (!response.ok) {
            throw new Error("Unable to load user details");
        }

        const user = await response.json();

        display.innerHTML = `
            <div class="col-12 col-lg-8">
                <div class="detail-card">

                    <div class="profile-heading">
                        <div class="large-avatar">
                            ${user.name.charAt(0).toUpperCase()}
                        </div>

                        <h2>${user.name}</h2>
                        <p>@${user.username}</p>
                    </div>

                    <div class="detail-section">
                        <h3>Contact Information</h3>
                        <p><strong>Email:</strong> ${user.email}</p>
                        <p><strong>Phone:</strong> ${user.phone}</p>
                        <p><strong>Website:</strong> ${user.website}</p>
                    </div>

                    <div class="detail-section">
                        <h3>Address</h3>
                        <p>${user.address.street}, ${user.address.suite}</p>
                        <p>${user.address.city}, ${user.address.zipcode}</p>
                        <p><strong>Latitude:</strong> ${user.address.geo.lat}</p>
                        <p><strong>Longitude:</strong> ${user.address.geo.lng}</p>
                    </div>

                    <div class="detail-section">
                        <h3>Company</h3>
                        <p><strong>Name:</strong> ${user.company.name}</p>
                        <p><strong>About:</strong> ${user.company.catchPhrase}</p>
                        <p><strong>Business:</strong> ${user.company.bs}</p>
                    </div>

                    <a href="index.html" class="profile-btn">
                        Back to Users
                    </a>

                </div>
            </div>
        `;
    } catch (error) {
        display.innerHTML = `
            <div class="col-12">
                <p class="error-message">
                    Profile could not be loaded. Please try again.
                </p>
            </div>
        `;

        console.log(error);
    }
}

getUserDetails();
