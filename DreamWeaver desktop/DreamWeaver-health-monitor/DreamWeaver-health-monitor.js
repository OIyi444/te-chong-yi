// Initialize Charts
const heartRateCtx = document.getElementById('heartRateChart').getContext('2d');
const heartRateChart = new Chart(heartRateCtx, {
    type: 'line',
    data: {
        labels: ['10 PM', '11 PM', '12 AM', '1 AM', '2 AM', '3 AM', '4 AM', '5 AM', '6 AM'],
        datasets: [{
            label: 'Heart Rate (bpm)',
            data: [72, 68, 65, 70, 75, 72, 75, 85, 78],
            borderColor: '#ff3860',
            backgroundColor: 'rgba(255, 56, 96, 0.1)',
            borderWidth: 3,
            pointRadius: 4,
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
            },
            annotation: {
                annotations: {
                    warningThreshold: {
                        type: 'line',
                        yMin: 110,
                        yMax: 110,
                        borderColor: '#ffdd57',
                        borderWidth: 2,
                        borderDash: [5, 5],
                        label: {
                            content: 'Warning Threshold',
                            position: 'end'
                        }
                    },
                    criticalThreshold: {
                        type: 'line',
                        yMin: 120,
                        yMax: 120,
                        borderColor: '#ff3860',
                        borderWidth: 2,
                        borderDash: [5, 5],
                        label: {
                            content: 'Critical Threshold',
                            position: 'end'
                        }
                    }
                }
            }
        }
    }
});

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
            borderWidth: 3,
            pointRadius: 4,
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
            },
            annotation: {
                annotations: {
                    warningThreshold: {
                        type: 'line',
                        yMin: 10,
                        yMax: 10,
                        borderColor: '#ffdd57',
                        borderWidth: 2,
                        borderDash: [5, 5],
                        label: {
                            content: 'Warning Threshold',
                            position: 'end'
                        }
                    }
                }
            }
        }
    }
});

// Alert Modal Functionality
const alertModal = document.getElementById('alertModal');
const dismissBtn = document.getElementById('dismissAlert');

// Function to simulate health alert
function simulateHealthAlert() {
    // Update UI to show critical status
    const heartRateEl = document.querySelector('.heart-card .metric-value');
    const heartStatus = document.querySelector('.heart-card .status-indicator');
    const breathRateEl = document.querySelector('.breath-card .metric-value');
    const breathStatus = document.querySelector('.breath-card .status-indicator');
    
    heartRateEl.textContent = '128 bpm';
    heartStatus.innerHTML = '<div class="status-dot status-critical"></div><span>Critical</span>';
    
    breathRateEl.textContent = '9 rpm';
    breathStatus.innerHTML = '<div class="status-dot status-warning"></div><span>Warning</span>';
    
    // Update chart data to show anomaly
    heartRateChart.data.datasets[0].data = [72, 68, 65, 70, 75, 128, 115, 85, 78];
    breathChart.data.datasets[0].data = [16, 15, 14, 15, 14, 9, 12, 15, 16];
    heartRateChart.update();
    breathChart.update();
    
    // Show alert modal
    alertModal.classList.add('active');
    
    // Play alert sound
    const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3');
    audio.volume = 0.5;
    audio.play();
}

// Show alert after 10 seconds for demo
setTimeout(simulateHealthAlert, 10000);

dismissBtn.addEventListener('click', () => {
    alertModal.classList.remove('active');
});

// Simulate changing heart rate for demo (normal behavior)
let demoHeartRate = 72;
const heartRateEl = document.querySelector('.heart-card .metric-value');

setInterval(() => {
    // Random fluctuation in normal range
    demoHeartRate = 72 + Math.random() * 8 - 4; // +/- 4 bpm
    heartRateEl.textContent = Math.round(demoHeartRate) + ' bpm';
}, 3000);
