import { useState, useEffect, useRef } from 'react';
import '../styles/components/LogoSparkles.css';

const LogoSparkles = ({ children }) => {
  const [isHovered, setIsHovered] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    const updateCanvasSize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth + 80;
        canvas.height = parent.clientHeight + 80;
      }
    };

    updateCanvasSize();

    class Sparkle {
      constructor(width, height) {
        const padding = 40;
        const edge = Math.floor(Math.random() * 4);

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

        const centerX = width / 2;
        const centerY = height / 2;
        const angle = Math.atan2(this.y - centerY, this.x - centerX);

        const speed = Math.random() * 1.5 + 0.5;
        this.speedX = Math.cos(angle) * speed;
        this.speedY = Math.sin(angle) * speed;

        this.size = Math.random() * 4 + 2;
        this.alpha = 1;
        this.decay = Math.random() * 0.02 + 0.015;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.alpha -= this.decay;
      }

      draw(context) {
        context.save();
        context.beginPath();
        context.fillStyle = `rgba(255, 215, 0, ${this.alpha})`;
        context.shadowBlur = 8;
        context.shadowColor = '#ffd700';

        for (let i = 0; i < 4; i++) {
          context.lineTo(
            this.x + Math.cos((i * Math.PI) / 2) * this.size,
            this.y + Math.sin((i * Math.PI) / 2) * this.size
          );
          context.lineTo(
            this.x + Math.cos((i * Math.PI) / 2 + Math.PI / 4) * (this.size / 2),
            this.y + Math.sin((i * Math.PI) / 2 + Math.PI / 4) * (this.size / 2)
          );
        }
        context.closePath();
        context.fill();
        context.restore();
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (isHovered && Math.random() < 0.6) {
        particles.push(new Sparkle(canvas.width, canvas.height));
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw(ctx);

        if (particles[i].alpha <= 0) {
          particles.splice(i, 1);
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isHovered]);

  return (
    <div
      className="sparkle-wrapper"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <canvas ref={canvasRef} className="sparkle-canvas" />
      <div className={`sparkle-content ${isHovered ? 'hovered' : ''}`}>
        {children}
      </div>
    </div>
  );
};

export default LogoSparkles;