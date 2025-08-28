// Cursor personalizado
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    cursor.style.left = mouseX - 10 + 'px';
    cursor.style.top = mouseY - 10 + 'px';
    
    // Criar partículas no rastro
    createParticle(mouseX, mouseY);
});

// Animação suave do cursor follower
function animateCursorFollower() {
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;
    
    cursorFollower.style.left = followerX - 4 + 'px';
    cursorFollower.style.top = followerY - 4 + 'px';
    
    requestAnimationFrame(animateCursorFollower);
}
animateCursorFollower();

// Criar partículas no rastro do mouse
function createParticle(x, y) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    
    // Movimento aleatório das partículas
    const randomX = (Math.random() - 0.5) * 100 + 'px';
    const randomY = (Math.random() - 0.5) * 100 + 'px';
    particle.style.setProperty('--random-x', randomX);
    particle.style.setProperty('--random-y', randomY);
    
    document.body.appendChild(particle);
    
    // Remover partícula após animação
    setTimeout(() => {
        particle.remove();
    }, 1500);
}

// Efeitos hover nos links
const links = document.querySelectorAll('a');
links.forEach(link => {
    link.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(1.5)';
        cursor.style.backgroundColor = 'rgba(204, 51, 51, 0.2)';
    });
    
    link.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursor.style.backgroundColor = 'transparent';
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Criar partículas flutuantes de fundo
function createFloatingParticles() {
    const container = document.querySelector('.floating-particles');
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 8 + 's';
        particle.style.animationDuration = (8 + Math.random() * 4) + 's';
        container.appendChild(particle);
    }
}
createFloatingParticles();

// Efeito parallax suave
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const card = document.querySelector('.card');
    const rate = scrolled * -0.5;
    card.style.transform = `translateY(${rate}px)`;
});