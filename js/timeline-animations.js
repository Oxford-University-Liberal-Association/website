/**
 * Timeline Interactive Animations
 * Adds scroll-triggered animations and interactive effects to the timeline
 */

(function() {
    'use strict';

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTimeline);
    } else {
        initTimeline();
    }

    function initTimeline() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        const timelineMarkers = document.querySelectorAll('.timeline-marker');
        
        if (timelineItems.length === 0) return;

        // Add initial hidden state
        timelineItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = item.classList.contains('left') 
                ? 'translateX(-50px)' 
                : 'translateX(50px)';
            item.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        });

        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Stagger animation delay
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateX(0)';
                        
                        // Add animated class for marker pulse
                        const marker = entry.target.querySelector('.timeline-marker');
                        if (marker) {
                            marker.classList.add('timeline-marker-animate');
                        }
                    }, index * 100);
                    
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe all timeline items
        timelineItems.forEach(item => observer.observe(item));

        // Add hover parallax effect to timeline cards
        const timelineCards = document.querySelectorAll('.timeline-card');
        timelineCards.forEach(card => {
            card.addEventListener('mouseenter', function(e) {
                this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
            });

            card.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                
                this.style.transform = `translateY(-5px) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
            });

            card.addEventListener('mouseleave', function() {
                this.style.transform = '';
            });
        });

        // Add click interaction to expand/highlight timeline items
        timelineItems.forEach(item => {
            const card = item.querySelector('.timeline-card');
            if (card) {
                card.style.cursor = 'pointer';
                card.addEventListener('click', function() {
                    // Toggle highlight effect
                    const wasActive = this.classList.contains('timeline-active');
                    
                    // Remove active from all cards
                    document.querySelectorAll('.timeline-card').forEach(c => {
                        c.classList.remove('timeline-active');
                    });
                    
                    // Add active to clicked card if it wasn't already active
                    if (!wasActive) {
                        this.classList.add('timeline-active');
                        // Scroll smoothly to center the card
                        this.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                });
            }
        });

        // Animate the timeline line on scroll
        animateTimelineLine();
    }

    function animateTimelineLine() {
        const timeline = document.querySelector('.timeline-enhanced');
        if (!timeline) return;

        const timelineLine = document.querySelector('.timeline-enhanced::before');
        
        window.addEventListener('scroll', () => {
            const timelineRect = timeline.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            // Calculate how much of the timeline is visible
            if (timelineRect.top < windowHeight && timelineRect.bottom > 0) {
                const visibleHeight = Math.min(windowHeight - timelineRect.top, timelineRect.height);
                const percentage = (visibleHeight / timelineRect.height) * 100;
                
                // Update CSS custom property for line animation
                timeline.style.setProperty('--timeline-progress', `${percentage}%`);
            }
        });
    }

})();
