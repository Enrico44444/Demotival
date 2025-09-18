// Cursor personalizado (otimizado)
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;
let lastParticleTime = 0;
const particleDelay = 150;
let animationId;
let mouseInitialized = false;

// Esconder cursor até o mouse se mover
cursor.style.opacity = '0';
cursorFollower.style.opacity = '0';

// Otimizar movimento do cursor com requestAnimationFrame
function updateCursor() {
    if (mouseInitialized) {
        cursor.style.transform = `translate3d(${mouseX - 10}px, ${mouseY - 10}px, 0)`;
        
        // Animação suave do cursor follower
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        cursorFollower.style.transform = `translate3d(${followerX - 4}px, ${followerY - 4}px, 0)`;
    }
    
    requestAnimationFrame(updateCursor);
}

document.addEventListener('mousemove', (e) => {
    if (!mouseInitialized) {
        // Primeira vez que o mouse se move, mostrar cursors
        cursor.style.opacity = '1';
        cursorFollower.style.opacity = '1';
        mouseInitialized = true;
        
        // Inicializar posições do follower
        followerX = e.clientX;
        followerY = e.clientY;
    }
    
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Criar partículas no rastro com throttle
    const now = Date.now();
    if (now - lastParticleTime > particleDelay) {
        createParticle(mouseX, mouseY);
        lastParticleTime = now;
    }
});

// Iniciar animação do cursor
updateCursor();

// Criar partículas no rastro do mouse (super otimizado)
let particleCount = 0;
const maxParticles = 15; // Reduzido de 30 para 15
const particlePool = []; // Pool de partículas reutilizáveis

function createParticle(x, y) {
    // Não criar se já temos muitas partículas
    if (particleCount >= maxParticles) return;
    
    let particle;
    
    // Reutilizar partícula do pool se disponível
    if (particlePool.length > 0) {
        particle = particlePool.pop();
    } else {
        particle = document.createElement('div');
        particle.className = 'particle';
    }
    
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.opacity = '1';
    particle.style.transform = 'scale(1)';
    
    // Movimento aleatório das partículas
    const randomX = (Math.random() - 0.5) * 80 + 'px'; // Reduzido de 100 para 80
    const randomY = (Math.random() - 0.5) * 80 + 'px';
    particle.style.setProperty('--random-x', randomX);
    particle.style.setProperty('--random-y', randomY);
    
    document.body.appendChild(particle);
    particleCount++;
    
    // Remover partícula após animação e retornar ao pool
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
            particleCount--;
            particlePool.push(particle); // Retornar ao pool para reutilização
        }
    }, 1000); // Reduzido de 1500 para 1000ms
}

// Efeitos hover nos links (otimizado)
const links = document.querySelectorAll('a');
links.forEach(link => {
    link.addEventListener('mouseenter', () => {
        cursor.style.transform += ' scale(1.5)';
        cursor.style.backgroundColor = 'rgba(204, 51, 51, 0.2)';
    });
    
    link.addEventListener('mouseleave', () => {
        cursor.style.transform = cursor.style.transform.replace(' scale(1.5)', '');
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

// Criar partículas flutuantes de fundo (reduzido)
function createFloatingParticles() {
    const container = document.querySelector('.floating-particles');
    const particleCount = 8; // Reduzido de 20 para 8
    
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

// Efeito parallax suave (otimizado com throttle)
let ticking = false;

function updateParallax() {
    const scrolled = window.pageYOffset;
    const card = document.querySelector('.card');
    if (card) {
        const rate = scrolled * -0.2; // Reduzido de -0.5 para -0.2
        card.style.transform = `translateY(${rate}px)`;
    }
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
    }
});