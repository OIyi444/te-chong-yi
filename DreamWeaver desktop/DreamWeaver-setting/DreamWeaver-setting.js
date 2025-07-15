// ====== Theme toggle button (UI only) ======
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
    themeToggle.checked = false; // 默认不勾选
    themeToggle.addEventListener('change', () => {
        console.log(`Theme toggle switched to ${themeToggle.checked ? 'dark' : 'light'}`);
    });
}

// ====== Language & Region Save Button (UI only) ======
const saveLanguageBtn = document.getElementById('saveLanguageBtn');
if (saveLanguageBtn) {
    saveLanguageBtn.addEventListener('click', () => {
        // 模拟保存动画
        const originalHTML = saveLanguageBtn.innerHTML;
        saveLanguageBtn.innerHTML = '<i class="fas fa-check"></i> Saved!';
        saveLanguageBtn.style.background = 'var(--normal)';

        setTimeout(() => {
            saveLanguageBtn.innerHTML = originalHTML;
            saveLanguageBtn.style.background = '';
        }, 2000);
    });
}

// ====== Emergency Contacts functionality ======
const contactsList = document.getElementById('contactsList');
const addContactBtn = document.getElementById('addContactBtn');

function loadContacts() {
    const contacts = JSON.parse(localStorage.getItem('emergencyContacts') || '[]');
    contactsList.innerHTML = '';

    contacts.forEach((contact, index) => {
        const contactItem = document.createElement('div');
        contactItem.className = 'contact-item';
        contactItem.innerHTML = `
            <div>
                <strong>${contact.name}</strong><br>
                <span style="font-size: 13px; color: var(--text-secondary);">${contact.number}</span>
            </div>
            <div class="contact-actions">
                <i class="fas fa-trash-alt delete-contact" data-index="${index}" style="cursor: pointer; color: var(--critical);"></i>
            </div>
        `;
        contactsList.appendChild(contactItem);
    });

    document.querySelectorAll('.delete-contact').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            const contacts = JSON.parse(localStorage.getItem('emergencyContacts') || '[]');
            contacts.splice(index, 1);
            localStorage.setItem('emergencyContacts', JSON.stringify(contacts));
            loadContacts();
        });
    });
}

if (addContactBtn && contactsList) {
    addContactBtn.addEventListener('click', () => {
        const name = document.getElementById('contactName').value.trim();
        const number = document.getElementById('contactNumber').value.trim();

        if (name && number) {
            const contacts = JSON.parse(localStorage.getItem('emergencyContacts') || '[]');
            contacts.push({ name, number });
            localStorage.setItem('emergencyContacts', JSON.stringify(contacts));

            document.getElementById('contactName').value = '';
            document.getElementById('contactNumber').value = '';

            loadContacts();
        }
    });

    loadContacts();
}

// ====== Sound & Alerts functionality ======
function setupSoundControls() {
    const notificationSound = document.getElementById('notificationSound');
    const notificationVolume = document.getElementById('notificationVolume');
    const alarmSound = document.getElementById('alarmSound');
    const alarmVolume = document.getElementById('alarmVolume');

    if (notificationSound) {
        notificationSound.checked = localStorage.getItem('notificationSound') !== 'false';
        notificationSound.addEventListener('change', () => {
            localStorage.setItem('notificationSound', notificationSound.checked);
        });
    }

    if (notificationVolume) {
        notificationVolume.value = localStorage.getItem('notificationVolume') || '70';
        notificationVolume.addEventListener('input', () => {
            localStorage.setItem('notificationVolume', notificationVolume.value);
        });
    }

    if (alarmSound) {
        alarmSound.checked = localStorage.getItem('alarmSound') !== 'false';
        alarmSound.addEventListener('change', () => {
            localStorage.setItem('alarmSound', alarmSound.checked);
        });
    }

    if (alarmVolume) {
        alarmVolume.value = localStorage.getItem('alarmVolume') || '80';
        alarmVolume.addEventListener('input', () => {
            localStorage.setItem('alarmVolume', alarmVolume.value);
        });
    }
}
setupSoundControls();

// ====== Profile Save Feedback ======
const saveProfileBtn = document.getElementById('saveProfileBtn');
if (saveProfileBtn) {
    saveProfileBtn.addEventListener('click', () => {
        const originalHTML = saveProfileBtn.innerHTML;
        saveProfileBtn.innerHTML = '<i class="fas fa-check"></i> Changes Saved!';
        saveProfileBtn.style.background = 'var(--normal)';

        setTimeout(() => {
            saveProfileBtn.innerHTML = originalHTML;
            saveProfileBtn.style.background = '';
        }, 2000);
    });
}

// ====== Avatar Upload (placeholder only) ======
const avatarUpload = document.querySelector('.avatar-upload');
if (avatarUpload) {
    avatarUpload.addEventListener('click', () => {
        alert('Avatar upload functionality would open a file dialog in a real application.');
    });
}

// ====== Password visibility toggle ======
const passwordInputs = document.querySelectorAll('input[type="password"]');
passwordInputs.forEach(input => {
    const container = document.createElement('div');
    container.style.position = 'relative';
    input.parentNode.insertBefore(container, input);
    container.appendChild(input);

    const toggle = document.createElement('i');
    toggle.className = 'fas fa-eye';
    toggle.style.position = 'absolute';
    toggle.style.right = '15px';
    toggle.style.top = '50%';
    toggle.style.transform = 'translateY(-50%)';
    toggle.style.cursor = 'pointer';
    toggle.style.color = 'var(--text-secondary)';
    container.appendChild(toggle);

    toggle.addEventListener('click', () => {
        if (input.type === 'password') {
            input.type = 'text';
            toggle.className = 'fas fa-eye-slash';
        } else {
            input.type = 'password';
            toggle.className = 'fas fa-eye';
        }
    });
});

// ====== Sidebar Navigation Toggle ======
document.querySelectorAll('.sidebar-item').forEach(item => {
    item.addEventListener('click', () => {
        document.querySelectorAll('.sidebar-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');

        const header = document.querySelector('.section-header h1');
        if (header) {
            header.textContent = item.querySelector('span').textContent;
        }
    });
});
