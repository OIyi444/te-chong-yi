// Initialize Charts
function initializeCharts() {
    // Heart Rate Chart
    const heartRateCtx = document.getElementById('heartRateChart').getContext('2d');
    const heartRateChart = new Chart(heartRateCtx, {
        type: 'line',
        data: {
            labels: ['10 PM', '11 PM', '12 AM', '1 AM', '2 AM', '3 AM', '4 AM', '5 AM', '6 AM'],
            datasets: [{
                label: 'Heart Rate (bpm)',
                data: [75, 60, 64, 78, 75, 72, 75, 85, 78],
                borderColor: '#ff3860',
                backgroundColor: 'rgba(255, 56, 96, 0.1)',
                borderWidth: 2,
                pointRadius: 3,
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    min: 50,
                    max: 140,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });

    // Breathing Chart
    const breathCtx = document.getElementById('breathChart').getContext('2d');
    const breathChart = new Chart(breathCtx, {
        type: 'line',
        data: {
            labels: ['10 PM', '11 PM', '12 AM', '1 AM', '2 AM', '3 AM', '4 AM', '5 AM', '6 AM'],
            datasets: [{
                label: 'Breaths per Minute',
                data: [16, 15, 14, 15, 14, 16, 15, 15, 16],
                borderColor: '#00d1b2',
                backgroundColor: 'rgba(0, 209, 178, 0.1)',
                borderWidth: 2,
                pointRadius: 3,
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    min: 5,
                    max: 20,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });

    return { heartRateChart, breathChart };
}

// Chart selector functionality
function setupChartSelector() {
    const chartSelect = document.getElementById('chartSelect');
    const chartContainers = {
        heart: document.getElementById('heartChartContainer'),
        breath: document.getElementById('breathChartContainer')
    };

    chartSelect.addEventListener('change', (e) => {
        // Hide all charts
        Object.values(chartContainers).forEach(container => {
            container.classList.remove('active');
        });

        // Show selected chart
        chartContainers[e.target.value].classList.add('active');
    });
}

// Alert Modal Functionality
const alertModal = document.getElementById('alertModal');
const dismissBtn = document.getElementById('dismissAlert');

// Function to simulate health alert
function simulateHealthAlert(charts) {
    // Update UI to show critical status
    const heartRateEl = document.querySelectorAll('.metric-card .metric-value')[0];
    const heartStatus = document.querySelector('.status-indicator');

    heartRateEl.textContent = '128 bpm';
    heartStatus.innerHTML = '<div class="status-dot status-critical"></div><span>Critical</span>';

    // Update chart data to show anomaly
    charts.heartRateChart.data.datasets[0].data = [72, 68, 65, 70, 75, 128, 115, 85, 78];
    charts.heartRateChart.update();

    // Show alert modal
    alertModal.classList.add('active');

    // Play alert sound
    const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3');
    audio.volume = 0.3;
    audio.play();
}

// Simulate changing heart rate for demo (normal behavior)
function simulateNormalFluctuations() {
    let demoHeartRate = 72;
    const heartRateEl = document.querySelectorAll('.metric-card .metric-value')[0];

    setInterval(() => {
        // Random fluctuation in normal range
        demoHeartRate = 72 + Math.random() * 8 - 4; // +/- 4 bpm
        heartRateEl.textContent = Math.round(demoHeartRate) + ' bpm';
    }, 3000);
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    const charts = initializeCharts();
    setupChartSelector();
    simulateNormalFluctuations();

    // Show alert after 10 seconds for demo
    setTimeout(() => simulateHealthAlert(charts), 10000);

    dismissBtn.addEventListener('click', () => {
        alertModal.classList.remove('active');
    });
});