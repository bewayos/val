document.addEventListener("DOMContentLoaded", () => {
    const heart = new NextParticle({
        renderer: 'webgl',
        width: window.innerWidth,
        height: window.innerHeight,
        shape: 'heart',  // Форма серця
        particleGap: 2,  // Відстань між точками
        particleSize: 2, // Розмір точок
        mouseForce: 80,  // Взаємодія з мишею
        noise: 5,        // Ефект хаотичного руху
        layerCount: 4,   // Глибина шарів частинок
        layerDistance: 3,
    });

    // Ефект "дихання" (зміна яскравості)
    let brightness = 1;
    let direction = 1;

    function animateBreathing() {
        brightness += direction * 0.02;
        if (brightness > 1.2 || brightness < 0.8) {
            direction *= -1;
        }
        heart.set({
            opacity: brightness
        });
        requestAnimationFrame(animateBreathing);
    }
    animateBreathing();

    // Автоматичне оновлення розміру при зміні екрану
    window.addEventListener("resize", () => {
        heart.setSize(window.innerWidth, window.innerHeight);
    });
});
