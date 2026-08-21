import React, { useState, useEffect, useRef } from 'react';
import '../styles/components/Sparkles.css';

// The particle blueprint
class Particle {
    constructor(width, height) {
        const padding = 40;
        const edge = Math.floor(Math.random() * 4);

        // 1. Starting position (Center of the canvas)
        if (edge === 0) {
            this.x = padding + Math.random() * (width - padding * 2);
            this.y = padding;
        } else if (edge === 1) {
            this.x = width - padding;
            this.y = padding + Math.random() * (height - padding * 2);
        } else if (edge === 2) {
            this.x = padding + Math.random() * (width - padding * 2);
            this.y = height - padding;
        } else {
            this.x = padding;
            this.y = padding + Math.random() * (height - padding * 2);
        }

        const cx = width / 2;
        const cy = height / 2;

        // 2. Trajectory Math (Random angle and speed)
        const angle = Math.atan2(this.y - cy, this.x - cx);
        const speed = Math.random() * 1.5 + 0.5;

        // 3. Horizontal and vertical speed
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;

        // 4. Visual properties
        this.size = Math.random() * 3 + 3;
        this.alpha = 1; // Start fully visible (100% opacity)
        this.decay = Math.random() * 0.02 + 0.015; // How fast it fades per frame
    }

    // Update properties for the next frame
    update(width, height) {
        this.x += this.vx;
        this.y += this.vy;

        // 1. Standard time-based fade
        this.alpha -= this.decay;

        // 2. Distance-based fade near canvas borders (40px boundary threshold)
        const padding = 40;
        const distToEdgeX = Math.min(this.x, width - this.x);
        const distToEdgeY = Math.min(this.y, height - this.y);
        const minDist = Math.min(distToEdgeX, distToEdgeY);

        if (minDist < padding) {
            // Linearly scale opacity down to 0 near edges
            const edgeAlpha = minDist / padding;
            this.alpha = Math.min(this.alpha, edgeAlpha);
        }
    }

    // Draw this particle onto the canvas
    draw(ctx) {
        ctx.save();
        const currentColor = getComputedStyle(document.documentElement)
            .getPropertyValue('--glow')
            .trim();
        ctx.globalAlpha = Math.max(0, this.alpha); // Prevent negative alpha values
        ctx.fillStyle = currentColor || '#f4df7e'; // Seavalanche Gold fallback
        ctx.shadowBlur = 1;
        ctx.shadowColor = currentColor || '#f4df7e'; // Seavalanche Gold fallback
        ctx.beginPath();
        // ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); // Draw a circle
        for (let i = 0; i < 4; i++) {
            ctx.lineTo(
                this.x + Math.cos((i * Math.PI) / 2) * this.size,
                this.y + Math.sin((i * Math.PI) / 2) * this.size
            );
            ctx.lineTo(
                this.x + Math.cos((i * Math.PI) / 2 + Math.PI / 4) * (this.size / 2),
                this.y + Math.sin((i * Math.PI) / 2 + Math.PI / 4) * (this.size / 2)
            );
        } // Draw a star shape
        ctx.fill();
        ctx.restore();
    }
}

function Sparkles({ children }) {
    const [isHovered, setIsHovered] = useState(false);
    const canvasRef = useRef(null);

    // The canvas render loop
    useEffect(() => {
        // 1. Get the real canvas element from our ref
        const canvas = canvasRef.current;
        if (!canvas) return;

        // 2. Get the drawing tool (ctx)
        const ctx = canvas.getContext('2d');
        const parent = canvas.parentElement;

        // 3. Match canvas resolution to wrapper size (+ 80px extra space)
        canvas.width = parent.clientWidth + 80;
        canvas.height = parent.clientHeight + 80;

        let animationFrameId;
        let particles = []; // Stores active sparkle objects

        // 4. The 60 FPS loop function
        const animate = () => {
            // A. Wipe previous frame clean
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // B. Spawn a new sparkle if user is hovering (40% chance per frame)
            if (isHovered && Math.random() < 0.4) {
                particles.push(new Particle(canvas.width, canvas.height));
            }

            // C. Update and redraw existing sparkles
            for (let i = particles.length - 1; i >= 0; i--) {
                const p = particles[i];
                p.update(canvas.width, canvas.height); // Move and fade
                p.draw(ctx); // Draw new position

                // D. Remove dead (invisible) particles from memory
                if (p.alpha <= 0) {
                    particles.splice(i, 1);
                }
            }

            // E. Schedule next frame draw
            animationFrameId = requestAnimationFrame(animate);
        };

        // 5. Start the loop
        animate();

        // 6. Cleanup function on unmount or hover change
        return () => cancelAnimationFrame(animationFrameId);
    }, [isHovered]); // Re-run effect whenever isHovered changes

    return (
        <div className='sparkle-wrapper'
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <canvas ref={canvasRef} className='sparkle-canvas' />
            <div className='sparkle-content'>
                {children}
            </div>
        </div>
    )
}

export default Sparkles;