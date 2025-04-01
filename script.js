document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    const navIndicator = document.querySelector('.nav-indicator');
    const navLinksAll = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update active section in navigation
        updateActiveNavLink();
    });
    
    function updateActiveNavLink() {
        let fromTop = window.scrollY + 100;
        
        navLinksAll.forEach(link => {
            const section = document.querySelector(link.getAttribute('href'));
            
            if (
                section.offsetTop <= fromTop &&
                section.offsetTop + section.offsetHeight > fromTop
            ) {
                link.classList.add('active');
                
                // Update nav indicator position
                const linkRect = link.getBoundingClientRect();
                const navRect = navLinks.getBoundingClientRect();
                
                navIndicator.style.width = `${linkRect.width}px`;
                navIndicator.style.left = `${linkRect.left - navRect.left}px`;
            } else {
                link.classList.remove('active');
            }
        });
    }
    
    // Initialize nav indicator
    const activeLink = document.querySelector('.nav-link.active');
    if (activeLink) {
        const linkRect = activeLink.getBoundingClientRect();
        const navRect = navLinks.getBoundingClientRect();
        
        navIndicator.style.width = `${linkRect.width}px`;
        navIndicator.style.left = `${linkRect.left - navRect.left}px`;
    }
    
    // Back to top button
    const backToTopBtn = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });
    
    // Animate skill bars on scroll
    const skillItems = document.querySelectorAll('.skill-item');
    
    function animateSkills() {
        skillItems.forEach(item => {
            const percent = item.getAttribute('data-percent');
            const progressBar = item.querySelector('.skill-progress');
            
            if (isElementInViewport(item) && !progressBar.style.width) {
                progressBar.style.width = `${percent}%`;
            }
        });
    }
    
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }
    
    window.addEventListener('scroll', animateSkills);
    animateSkills(); // Run once on page load
    
    // Projects filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active filter button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            // Filter projects
            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Project modal
    const projectModal = document.querySelector('.project-modal');
    const viewProjectButtons = document.querySelectorAll('.view-project');
    const modalClose = document.querySelector('.modal-close');
    const modalDemoLink = document.querySelector('.modal-demo-link');

    viewProjectButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();

            const projectCard = this.closest('.project-card');
            const projectImage = projectCard.querySelector('img').src;
            const projectTitle = this.getAttribute('data-title');
            const projectDesc = this.getAttribute('data-description');
            const projectCategory = this.getAttribute('data-category');
            const projectTech = this.getAttribute('data-tech');
            const projectDemo = this.getAttribute('data-demo');

            // Set modal content
            document.querySelector('.modal-image img').src = projectImage;
            document.querySelector('.modal-title').textContent = projectTitle;
            document.querySelector('.modal-description').textContent = projectDesc;
            document.querySelector('.modal-category').textContent = projectCategory;
            document.querySelector('.modal-date').textContent = new Date().toLocaleDateString();

            // Set tech tags
            if (projectTech) {
                const techTagsContainer = document.querySelector('.tech-tags');
                techTagsContainer.innerHTML = '';
                projectTech.split(',').forEach(tech => {
                    const tag = document.createElement('span');
                    tag.textContent = tech.trim();
                    techTagsContainer.appendChild(tag);
                });
            }

            // Set demo link
            if (projectDemo && projectDemo !== '#') {
                modalDemoLink.href = projectDemo;
                modalDemoLink.style.display = 'inline-flex';
            } else {
                modalDemoLink.style.display = 'none';
            }

            // Open modal
            projectModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    modalClose.addEventListener('click', function () {
        projectModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    // Close modal when clicking outside
    projectModal.addEventListener('click', function (e) {
        if (e.target === projectModal) {
            projectModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Prevent modal from closing when clicking links
    modalDemoLink.addEventListener('click', function (e) {
        e.stopPropagation();
    });
    
    // Contact form validation
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const subject = document.getElementById('subject');
            const message = document.getElementById('message');
            
            // Simple validation
            if (name.value.trim() === '') {
                alert('Please enter your name');
                name.focus();
                return false;
            }
            
            if (email.value.trim() === '') {
                alert('Please enter your email');
                email.focus();
                return false;
            }
            
            if (subject.value.trim() === '') {
                alert('Please enter a subject');
                subject.focus();
                return false;
            }
            
            if (message.value.trim() === '') {
                alert('Please enter your message');
                message.focus();
                return false;
            }
            
            // Here you would typically send the form data to a server
            // For demo purposes, we'll just show an alert
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
            
            return true;
        });
    }
    
    // Initialize animations
    initAnimations();
});
