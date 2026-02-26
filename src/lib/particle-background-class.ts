/**
 * ParticleBackground Class
 * A lightweight, high-performance particle system rendered on a canvas.
 * Features:
 * - Subtle neutral colors (light gray/soft blue)
 * - Smooth floating motion with drift and friction
 * - Mouse repulsion (soft and elastic)
 * - Interactive and responsive
 * - Memory efficient with proper cleanup
 */

interface ParticleOptions {
    x: number;
    y: number;
    radius: number;
    color: string;
    vx: number;
    vy: number;
    friction: number;
    alpha: number;
}

class Particle {
    x: number;
    y: number;
    originX: number;
    originY: number;
    radius: number;
    color: string;
    vx: number;
    vy: number;
    friction: number;
    alpha: number;

    constructor(options: ParticleOptions) {
        this.x = options.x;
        this.y = options.y;
        this.originX = options.x;
        this.originY = options.y;
        this.radius = options.radius;
        this.color = options.color;
        this.vx = options.vx;
        this.vy = options.vy;
        this.friction = options.friction;
        this.alpha = options.alpha;
    }

    update(mouseX: number, mouseY: number) {
        // Drift motion
        this.x += this.vx;
        this.y += this.vy;

        // Mouse interaction
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const forceRadius = 120;

        if (distance < forceRadius) {
            const angle = Math.atan2(dy, dx);
            const force = (forceRadius - distance) / forceRadius;
            const repulsion = force * 3; // Efficient repulsion

            this.vx -= Math.cos(angle) * repulsion;
            this.vy -= Math.sin(angle) * repulsion;
        }

        // Apply friction and return to drift
        this.vx *= this.friction;
        this.vy *= this.friction;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
    }
}

export class ParticleBackground {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private particles: Particle[] = [];
    private mouse = { x: -1000, y: -1000 };
    private animationFrameId: number | null = null;
    private boundResize: () => void;
    private boundMouseMove: (e: MouseEvent) => void;

    private readonly COLORS = ["#4b5563", "#374151", "#1f2937", "#60a5fa"]; // Darker grays and medium blue
    private readonly PARTICLE_COUNT = 200; // Solid coverage

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        const context = canvas.getContext("2d");
        if (!context) throw new Error("Could not get 2D context");
        this.ctx = context;

        this.boundResize = this.resize.bind(this);
        this.boundMouseMove = this.handleMouseMove.bind(this);

        this.init();
    }

    private init() {
        this.resize();
        this.createParticles();
        this.addEventListeners();
        this.animate();
    }

    private createParticles() {
        this.particles = [];
        for (let i = 0; i < this.PARTICLE_COUNT; i++) {
            this.particles.push(
                new Particle({
                    x: Math.random() * this.canvas.width,
                    y: Math.random() * this.canvas.height,
                    radius: Math.random() * 1.5 + 1, // 2-5px diameter
                    color: this.COLORS[Math.floor(Math.random() * this.COLORS.length)],
                    vx: (Math.random() - 0.5) * 0.4,
                    vy: (Math.random() - 0.5) * 0.4,
                    friction: 0.96,
                    alpha: Math.random() * 0.15 + 0.15, // Subtle alpha (0.15 to 0.3)
                })
            );
        }
    }

    private addEventListeners() {
        window.addEventListener("resize", this.boundResize);
        window.addEventListener("mousemove", this.boundMouseMove);
    }

    private removeEventListeners() {
        window.removeEventListener("resize", this.boundResize);
        window.removeEventListener("mousemove", this.boundMouseMove);
    }

    private handleMouseMove(e: MouseEvent) {
        this.mouse.x = e.clientX;
        this.mouse.y = e.clientY;
    }

    private resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        // Re-create particles on resize to ensure full coverage
        this.createParticles();
    }

    private animate = () => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach((particle) => {
            particle.update(this.mouse.x, this.mouse.y);

            // Screen wrap-around for continuous drift
            if (particle.x < -10) particle.x = this.canvas.width + 10;
            if (particle.x > this.canvas.width + 10) particle.x = -10;
            if (particle.y < -10) particle.y = this.canvas.height + 10;
            if (particle.y > this.canvas.height + 10) particle.y = -10;

            particle.draw(this.ctx);
        });

        this.animationFrameId = requestAnimationFrame(this.animate);
    };

    public destroy() {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
        }
        this.removeEventListeners();
    }
}
