document.addEventListener('DOMContentLoaded', () => {
    const notices = [
        { id: 1, title: 'Notice 1', description: 'This is the first notice.' },
        { id: 2, title: 'Notice 2', description: 'This is the second notice.' },
    ];

    const noticeContent = document.getElementById('notice-content');
    const addNoticeBtn = document.getElementById('add-notice-btn');
    const modal = document.getElementById('modal');
    const titleInput = document.getElementById('notice-title');
    const descriptionInput = document.getElementById('notice-description');
    const saveNoticeBtn = document.getElementById('save-notice-btn');
    const cancelNoticeBtn = document.getElementById('cancel-notice-btn');

    const renderNotices = () => {
        noticeContent.innerHTML = notices.map(({ id, title, description }) => `
        <div class="notice-card" data-id="${id}">
          <h3>${title}</h3>
          <p>${description}</p>
          <button class="delete-notice-btn">Delete</button>
        </div>
      `).join('');

        // Attach delete event listeners
        document.querySelectorAll('.delete-notice-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const noticeCard = e.target.closest('.notice-card');
                const noticeId = parseInt(noticeCard.dataset.id, 10);
                deleteNotice(noticeId);
            });
        });
    };

    const deleteNotice = (id) => {
        const index = notices.findIndex(notice => notice.id === id);
        if (index !== -1) {
            notices.splice(index, 1);
            renderNotices();
        }
    };

    addNoticeBtn.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    saveNoticeBtn.addEventListener('click', () => {
        const title = titleInput.value.trim();
        const description = descriptionInput.value.trim();

        if (title && description) {
            notices.push({ id: notices.length + 1, title, description });
            renderNotices();
            modal.style.display = 'none';
            titleInput.value = '';
            descriptionInput.value = '';
        } else {
            alert('Please fill out both fields.');
        }
    });

    cancelNoticeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        titleInput.value = '';
        descriptionInput.value = '';
    });

    renderNotices();
});
