document.addEventListener("DOMContentLoaded", () => {
    const app = new PIXI.Application({ 
        width: window.innerWidth, 
        height: window.innerHeight, 
        backgroundColor: 0x000000 
    });
    document.body.appendChild(app.view);

    const particles = [];
    const heartShape = [
        [0, -50], [30, -80], [60, -50], [30, 0], [0, 50], 
        [-30, 0], [-60, -50], [-30, -80], [0, -50]
    ];

    function createParticle(x, y) {
        const particle = new PIXI.Graphics();
        particle.beginFill(0xff0000);
        particle.drawCircle(0, 0, 3);
        particle.endFill();
        particle.x = x + app.screen.width / 2;
        particle.y = y + app.screen.height / 2;
        particle.vx = (Math.random() - 0.5) * 0.2;
        particle.vy = (Math.random() - 0.5) * 0.2;
        app.stage.addChild(particle);
        particles.push(particle);
    }

    for (let i = 0; i < 200; i++) {
        const point = heartShape[Math.floor(Math.random() * heartShape.length)];
        createParticle(point[0] * (Math.random() * 1.5), point[1] * (Math.random() * 1.5));
    }

    let brightness = 1;
    let direction = 0.02;
    
    app.ticker.add(() => {
        brightness += direction;
        if (brightness > 1.2 || brightness < 0.8) direction *= -1;

        particles.forEach(p => {
            p.alpha = brightness;
            p.x += p.vx;
            p.y += p.vy;
            p.vx *= 0.99;
            p.vy *= 0.99;
        });
    });

    window.addEventListener("mousemove", (event) => {
        const mx = event.clientX;
        const my = event.clientY;
        particles.forEach(p => {
            const dx = p.x - mx;
            const dy = p.y - my;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 50) {
                p.vx += dx * 0.01;
                p.vy += dy * 0.01;
            }
        });
    });

    window.addEventListener("resize", () => {
        app.renderer.resize(window.innerWidth, window.innerHeight);
    });
});
