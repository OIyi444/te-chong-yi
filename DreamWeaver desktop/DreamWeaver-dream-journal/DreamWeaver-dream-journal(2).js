// 🌙 Modal 功能
const dreamModal = document.getElementById('dreamModal');
const newDreamBtn = document.getElementById('newDreamBtn');
const closeModal = document.getElementById('closeModal');

newDreamBtn.addEventListener('click', () => {
    dreamModal.classList.add('active');
});
closeModal.addEventListener('click', () => {
    dreamModal.classList.remove('active');
});

// 🎨 Tag 选择切换
const tagOptions = document.querySelectorAll('.tag-option');
tagOptions.forEach(tag => {
    tag.addEventListener('click', () => {
        tag.classList.toggle('selected');
    });
});

// 📅 日历功能（动态日期 + 月份切换）
const calendarTitle = document.getElementById('calendarTitle');
const calendarGrid = document.getElementById('calendarGrid');
const prevMonthBtn = document.getElementById('prevMonth');
const nextMonthBtn = document.getElementById('nextMonth');

const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

function updateCalendar() {
    calendarTitle.textContent = `${monthNames[currentMonth]} ${currentYear}`;
    generateCalendar(currentMonth, currentYear);
}

function generateCalendar(month, year) {
    calendarGrid.innerHTML = "";

    const firstDay = new Date(year, month, 1).getDay(); // 星期几
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // 本月天数

    // 添加空白占位
    for (let i = 0; i < firstDay; i++) {
        const blank = document.createElement('div');
        blank.classList.add('calendar-day');
        calendarGrid.appendChild(blank);
    }

    // 添加日子
    for (let day = 1; day <= daysInMonth; day++) {
        const dayBox = document.createElement('div');
        dayBox.classList.add('calendar-day');
        dayBox.textContent = day;

        // 如果是今天则加上 active
        const isToday =
            day === currentDate.getDate() &&
            month === currentDate.getMonth() &&
            year === currentDate.getFullYear();
        if (isToday) {
            dayBox.classList.add('active');
        }

        calendarGrid.appendChild(dayBox);
    }
}

prevMonthBtn.addEventListener('click', () => {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    updateCalendar();
});

nextMonthBtn.addEventListener('click', () => {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    updateCalendar();
});

updateCalendar(); // 初始加载

// 🔍 Filter tag 功能
const filterTags = document.querySelectorAll('.filter-tag');
filterTags.forEach(tag => {
    tag.addEventListener('click', () => {
        if (tag.textContent === 'All') {
            filterTags.forEach(t => t.classList.remove('active'));
            tag.classList.add('active');
        } else {
            document.querySelector('.filter-tag:first-child').classList.remove('active');
            tag.classList.toggle('active');
        }
    });
});
