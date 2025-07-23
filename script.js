let timer;
let totalSeconds = 0;
let remainingSeconds = 0;
let isPaused = false;

function updateDisplay() {
    const hours = String(Math.floor(remainingSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((remainingSeconds % 3600) / 60)).padStart(2, '0');
    const seconds = String(remainingSeconds % 60).padStart(2, '0');
    document.getElementById('timer').textContent = `${hours}:${minutes}:${seconds}`;
}

function startTimer() {
    if (!isPaused) {
        const minutesInput = document.getElementById('minutes').value;
        totalSeconds = parseInt(minutesInput, 10) * 60;
        if (isNaN(totalSeconds) || totalSeconds <= 0) {
            alert('분을 올바르게 입력하세요.');
            return;
        }
        remainingSeconds = totalSeconds;
    }
    isPaused = false;
    clearInterval(timer);
    timer = setInterval(() => {
        if (remainingSeconds > 0) {
            remainingSeconds--;
            updateDisplay();
        } else {
            clearInterval(timer);
            alert('타이머 종료!');
        }
    }, 1000);
    updateDisplay();
}

function pauseTimer() {
    isPaused = true;
    clearInterval(timer);
}

function resetTimer() {
    clearInterval(timer);
    remainingSeconds = 0;
    isPaused = false;
    updateDisplay();
    document.getElementById('minutes').value = '';
}

updateDisplay();

// 마우스 커서 잔상 효과
const trailLength = 18;
const trail = [];
for (let i = 0; i < trailLength; i++) {
    const dot = document.createElement('div');
    dot.className = 'cursor-trail-dot';
    dot.style.opacity = (1 - i / trailLength) * 0.7 + 0.2;
    document.body.appendChild(dot);
    trail.push({ x: 0, y: 0, el: dot });
}
let mouseX = 0, mouseY = 0;
document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});
function animateTrail() {
    let x = mouseX, y = mouseY;
    for (let i = 0; i < trail.length; i++) {
        const dot = trail[i];
        dot.x += (x - dot.x) * 0.25;
        dot.y += (y - dot.y) * 0.25;
        dot.el.style.transform = `translate(${dot.x - 6}px, ${dot.y - 6}px)`;
        x = dot.x;
        y = dot.y;
    }
    requestAnimationFrame(animateTrail);
}
animateTrail();
