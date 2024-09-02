document.addEventListener('DOMContentLoaded', function() {
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const caption = document.getElementById('caption');
    const closeButton = document.querySelector('.close');


    function openLightbox(src, alt) {
        lightbox.style.display = 'block';
        lightboxImg.src = src;
        caption.textContent = alt;
    }

    document.querySelectorAll('.project-img, .extra img, .crime-project-img').forEach(img => {
        img.addEventListener('click', function() {
            openLightbox(this.src, this.alt);
        });
    });

    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
        }
    });

    closeButton.addEventListener('click', function() {
        lightbox.style.display = 'none';
    });


    const header = document.querySelector('header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop) {
            header.style.top = '-60px';  
        } else {
            header.style.top = '0';  
        }
        
        lastScrollTop = scrollTop;
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    const form = document.querySelector('form');
    form.addEventListener('submit', function(e) {
        const name = form.querySelector('input[name="name"]').value;
        const email = form.querySelector('input[name="email"]').value;
        const message = form.querySelector('textarea[name="message"]').value;
        
        if (!name || !email || !message) {
            e.preventDefault();
            alert('Please fill out all fields.');
        } else if (!validateEmail(email)) {
            e.preventDefault();
            alert('Please enter a valid email address.');
        }
    });

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    const loadMoreButton = document.getElementById('load-more');
    loadMoreButton.addEventListener('click', function() {
        alert('Loading more content...');
    });

});
document.querySelectorAll('.resume-item').forEach(item => {
    item.addEventListener('mouseover', () => {
        item.classList.add('hovered');
    });
    item.addEventListener('mouseout', () => {
        item.classList.remove('hovered');
    });
});
