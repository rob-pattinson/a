const heartsBg = document.getElementById('heartsBg');

function spawnHeart() {
    const h = document.createElement('div');
    const type = Math.random() > 0.3 ? 'heart-float' : 'star-float';
    h.className = type;
    const symbols = ['❤️', '💖', '💕', '💗', '💝', '💘', '✨', '⭐', '🌟'];
    h.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    const size = 16 + Math.random() * 28;
    h.style.fontSize = size + 'px';
    h.style.left = Math.random() * 100 + 'vw';
    h.style.animationDuration = (6 + Math.random() * 8) + 's';
    heartsBg.appendChild(h);
    setTimeout(() => h.remove(), 14000);
}
setInterval(spawnHeart, 400);

let isAnimating = false;

function openLetter() {
    const stage = document.getElementById('stage');
    if (stage.classList.contains('open') || isAnimating) return;
    isAnimating = true;

    const seal = document.getElementById('seal');
    seal.style.transform = 'translate(-50%, -50%) scale(1.4)';
    seal.style.opacity = '0';

    setTimeout(() => {
        stage.classList.add('open');
        isAnimating = false;
        setTimeout(() => {
            const envRect = document.getElementById('envelope').getBoundingClientRect();
            createBurst(
                envRect.left + envRect.width / 2,
                envRect.top + envRect.height / 2
            );
        }, 300);
    }, 250);
}

document.getElementById('stage').addEventListener('click', function(e) {
    if (this.classList.contains('open') && !e.target.closest('.letter-view')) {
        this.classList.remove('open');
        const seal = document.getElementById('seal');
        seal.style.transform = '';
        seal.style.opacity = '1';
        document.getElementById('surpriseMessage').classList.remove('show');
    }
});

const surpriseBtn = document.getElementById('surpriseBtn');
const surpriseMsg = document.getElementById('surpriseMessage');
const burstContainer = document.getElementById('burstContainer');

function createBurst(x, y) {
    const emojis = ['❤️', '💖', '💕', '💗', '💝', '💘', '✨', '⭐', '🌟', '💫', '🌸', '🌹', '💐'];
    const count = 45;
    for (let i = 0; i < count; i++) {
        const el = document.createElement('div');
        el.className = 'burst-item';
        el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        const size = 18 + Math.random() * 32;
        el.style.fontSize = size + 'px';
        const angle = Math.random() * 2 * Math.PI;
        const dist = 80 + Math.random() * 200;
        const tx = Math.cos(angle) * dist;
        const ty = Math.sin(angle) * dist - 60;
        el.style.setProperty('--tx', tx + 'px');
        el.style.setProperty('--ty', ty + 'px');
        el.style.left = (x + (Math.random() - 0.5) * 40) + 'px';
        el.style.top = (y + (Math.random() - 0.5) * 40) + 'px';
        el.style.animationDuration = (1.2 + Math.random() * 1.2) + 's';
        el.style.color = ['#e91e63', '#f06292', '#ec407a', '#f48fb1', '#f8bbd0', '#ff80ab', '#ffd54f', '#ffab91'][Math
            .floor(Math.random() * 8)
        ];
        burstContainer.appendChild(el);
        setTimeout(() => el.remove(), 3000);
    }
}

surpriseBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    surpriseMsg.classList.add('show');

    const rect = surpriseBtn.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    createBurst(cx, cy);

    setTimeout(() => {
        const letterRect = document.getElementById('letterView').getBoundingClientRect();
        createBurst(
            letterRect.left + letterRect.width * 0.2 + Math.random() * letterRect.width * 0.6,
            letterRect.top + letterRect.height * 0.2 + Math.random() * letterRect.height * 0.4
        );
    }, 300);

    setTimeout(() => {
        const rect2 = surpriseBtn.getBoundingClientRect();
        createBurst(
            rect2.left + rect2.width / 2 + (Math.random() - 0.5) * 120,
            rect2.top + rect2.height / 2 + (Math.random() - 0.5) * 80
        );
    }, 600);
});

document.getElementById('envelope').onclick = openLetter;

function updateImage(imageUrl) {
    document.querySelector('#letterPhoto img').src = imageUrl;
}