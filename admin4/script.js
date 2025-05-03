document.addEventListener('DOMContentLoaded', () => {
    const videoList = document.getElementById('video-list');
    const userList = document.getElementById('user-list');
    const analyticsData = document.getElementById('analytics-data');
    const noticeContent = document.getElementById('notice-content');
    const noticeBtn = document.getElementById('notice-btn');
    const noticeModal = document.getElementById('notice-modal');
    const closeModal = document.getElementById('close-modal');
    const noticeForm = document.getElementById('notice-form');
    const noticeTopic = document.getElementById('notice-topic');
    const noticeDescription = document.getElementById('notice-description');

    // Sample data
    const videos = [
        { id: 1, title: 'Video 1', views: 100 },
        { id: 2, title: 'Video 2', views: 200 },
    ];

    const users = [
        { id: 1, name: 'User 1', email: 'user1@example.com' },
        { id: 2, name: 'User 2', email: 'user2@example.com' },
    ];

    const notices = [
        { id: 1, title: 'Notice 1', description: 'This is the first notice.' },
        { id: 2, title: 'Notice 2', description: 'This is the second notice.' },
    ];

    // Render videos
    const renderVideos = () => {
        videoList.innerHTML = videos.map(({ id, title, views }) => `
            <div>
                <h3>${title}</h3>
                <p>Views: ${views}</p>
                <button onclick="editVideo(${id})">Edit</button>
                <button onclick="deleteVideo(${id})">Delete</button>
            </div>
        `).join('');
    };

    // Render users
    const renderUsers = () => {
        userList.innerHTML = users.map(({ id, name, email }) => `
            <div>
                <h3>${name}</h3>
                <p>Email: ${email}</p>
                <button onclick="editUser(${id})">Edit</button>
                <button onclick="deleteUser(${id})">Delete</button>
            </div>
        `).join('');
    };

    // Render analytics
    const renderAnalytics = () => {
        analyticsData.innerHTML = `
            <p>Total Videos: ${videos.length}</p>
            <p>Total Users: ${users.length}</p>
        `;
    };

    // Render notices
    const renderNotices = () => {
        noticeContent.innerHTML = notices.map(({ id, title, description }) => `
            <div>
                <h3>${title}</h3>
                <p>${description}</p>
            </div>
        `).join('');
    };

    // Open new window for creating a notice
    noticeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const noticeWindow = window.open('', '_blank', 'width=500,height=600');
        noticeWindow.document.write(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Create Notice</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        margin: 20px;
                        line-height: 1.6;
                    }
                    form {
                        display: flex;
                        flex-direction: column;
                        gap: 10px;
                    }
                    input, textarea, button {
                        padding: 10px;
                        font-size: 1rem;
                    }
                    button {
                        background-color: #4361ee;
                        color: white;
                        border: none;
                        cursor: pointer;
                    }
                    button:hover {
                        background-color: #3f37c9;
                    }
                </style>
            </head>
            <body>
                <h2>Create Notice</h2>
                <form id="notice-form">
                    <label for="notice-topic">Topic:</label>
                    <input type="text" id="notice-topic" required>
                    <label for="notice-description">Description:</label>
                    <textarea id="notice-description" rows="4" required></textarea>
                    <button type="submit">Add Notice</button>
                </form>
                <script>
                    const noticeForm = document.getElementById('notice-form');
                    noticeForm.addEventListener('submit', (e) => {
                        e.preventDefault();
                        const topic = document.getElementById('notice-topic').value;
                        const description = document.getElementById('notice-description').value;
                        const newNotice = { id: Date.now(), title: topic, description: description };
                        window.opener.notices.push(newNotice);
                        window.opener.renderNotices();
                        window.close();
                    });
                </script>
            </body>
            </html>
        `);
    });

    // Open notice modal
    document.getElementById("noticeBtn").addEventListener("click", function() {
        document.getElementById("noticeModal").style.display = "block";
    });

    // Close notice modal
    document.getElementById("closeNoticeModal").addEventListener("click", function() {
        document.getElementById("noticeModal").style.display = "none";
    });

    // Close modal when clicking outside content
    window.addEventListener("click", function(event) {
        const modal = document.getElementById("noticeModal");
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    // Handle form submission
    noticeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newNotice = {
            id: Date.now(),
            title: noticeTopic.value,
            description: noticeDescription.value,
        };
        notices.push(newNotice);
        renderNotices();
        noticeModal.style.display = 'none';
        noticeForm.reset();
    });

    // Initialize dashboard
    renderVideos();
    renderUsers();
    renderAnalytics();
    renderNotices();
});

