        // Create stars for background
        function createStars() {
            const starsContainer = document.getElementById('stars');
            const starCount = 150;
            
            for (let i = 0; i < starCount; i++) {
                const star = document.createElement('div');
                star.classList.add('star');
                
                // Random position
                const x = Math.random() * 100;
                const y = Math.random() * 100;
                star.style.left = `${x}%`;
                star.style.top = `${y}%`;
                
                // Random size
                const size = Math.random() * 3;
                star.style.width = `${size}px`;
                star.style.height = `${size}px`;
                
                // Random animation duration
                const duration = Math.random() * 5 + 3;
                star.style.setProperty('--duration', `${duration}s`);
                
                starsContainer.appendChild(star);
            }
        }
        
        // Initialize
        document.addEventListener('DOMContentLoaded', createStars);