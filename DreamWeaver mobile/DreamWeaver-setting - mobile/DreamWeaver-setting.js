// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    // Theme toggle functionality
    const themeToggle = document.querySelector('.setting-item input[type="checkbox"]');
    if (themeToggle) {
        themeToggle.addEventListener('change', () => {
            console.log('Theme toggled:', themeToggle.checked ? 'Dark' : 'Light');
        });
    }

    // Add contact button functionality
    const addContactBtn = document.querySelector('.btn-primary');
    if (addContactBtn) {
        addContactBtn.addEventListener('click', () => {
            const inputs = document.querySelectorAll('.form-row .setting-input');
            const name = inputs[0].value.trim();
            const number = inputs[1].value.trim();

            if (name && number) {
                const contactsList = document.querySelector('.contacts-list');
                const contactItem = document.createElement('div');
                contactItem.className = 'contact-item';
                contactItem.innerHTML = `
                    <div class="contact-info">
                        <div class="contact-name">${name}</div>
                        <div class="contact-number">${number}</div>
                    </div>
                    <i class="fas fa-trash-alt"></i>
                `;
                contactsList.appendChild(contactItem);

                // Clear inputs
                inputs[0].value = '';
                inputs[1].value = '';

                // Add delete functionality
                contactItem.querySelector('i').addEventListener('click', () => {
                    contactItem.remove();
                });
            }
        });
    }

    // Add delete functionality to existing contacts
    document.querySelectorAll('.contact-item i').forEach(icon => {
        icon.addEventListener('click', function () {
            this.parentElement.remove();
        });
    });
});