// Example data for logged-in users
const users = [
    { username: "user1", videosPosted: 5 },
    { username: "user2", videosPosted: 3 },
    { username: "user3", videosPosted: 8 }
];

// Function to populate the table with user data
function populateUsersTable() {
    const tableBody = document.querySelector("#usersTable tbody");
    users.forEach((user, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${user.username}</td>
            <td>${user.videosPosted}</td>
            <td><button class="delete-btn" data-index="${index}">Delete</button></td>
        `;
        tableBody.appendChild(row);
    });

    // Add event listeners to delete buttons
    tableBody.addEventListener("click", (event) => {
        if (event.target.classList.contains("delete-btn")) {
            const index = event.target.getAttribute("data-index");
            deleteUser(index);
        }
    });
}

function deleteUser(index) {
    users.splice(index, 1); // Remove user from the array
    const tableBody = document.querySelector("#usersTable tbody");
    tableBody.innerHTML = ""; // Clear the table
    populateUsersTable(); // Re-populate the table
}

// Populate the table on page load
document.addEventListener("DOMContentLoaded", populateUsersTable);

