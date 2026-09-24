// === SITE T.RAMOS — PREMIUM SCRIPT ===

// Efeito de scroll suave
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const alvo = document.querySelector(this.getAttribute('href'));
        if (alvo) {
            alvo.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Animação de entrada das seções ao rolar
const secoes = document.querySelectorAll('.secao, .galeria');

const observador = new IntersectionObserver((entradas) => {
    entradas.forEach(entrada => {
        if (entrada.isIntersecting) {
            entrada.target.style.opacity = '1';
            entrada.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

// Inicializa estado de animação
secoes.forEach(secao => {
    secao.style.opacity = '0';
    secao.style.transform = 'translateY(40px)';
    secao.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    observador.observe(secao);
});

// Efeito de parallax suave no cabeçalho
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    const scrollPos = window.scrollY;
    if (scrollPos < 400) {
        header.style.backgroundPositionY = `${scrollPos * 0.3}px`;
    }
});

// Pré-carregamento de imagens para galeria
document.addEventListener('DOMContentLoaded', () => {
    const imagens = document.querySelectorAll('img[loading="lazy"]');
    imagens.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';
        img.onload = () => {
            img.style.opacity = '1';
        };
        if (img.complete) img.style.opacity = '1';
    });

    console.log('%c✅ T.RAMOS — Site Carregado com Sucesso!', 
        'color: #b39316; font-size: 14px; font-weight: bold;');
});

// Galeria com suporte a mouse, teclado e foco acessível.
const fotos = document.querySelectorAll('.grid-fotos img');
const modal = document.getElementById('modalImagem');
const imagemAmpliada = document.getElementById('imagemAmpliada');
const botaoFechar = document.getElementById('fecharImagem');
let fotoAtiva = null;

function abrirImagem(foto) {
    fotoAtiva = foto;
    imagemAmpliada.src = foto.currentSrc || foto.src;
    imagemAmpliada.alt = `Imagem ampliada: ${foto.alt}`;
    modal.style.display = 'flex';
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    botaoFechar.focus();
}

function fecharImagem() {
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    imagemAmpliada.removeAttribute('src');

    if (fotoAtiva) {
        fotoAtiva.focus();
        fotoAtiva = null;
    }
}

fotos.forEach((foto) => {
    foto.tabIndex = 0;
    foto.setAttribute('role', 'button');
    foto.setAttribute('aria-label', `Ampliar: ${foto.alt}`);

    foto.addEventListener('click', () => abrirImagem(foto));
    foto.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            abrirImagem(foto);
        }
    });
});

botaoFechar.addEventListener('click', fecharImagem);

modal.addEventListener('click', (event) => {
    if (event.target === modal) fecharImagem();
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') {
        fecharImagem();
    }
});