class Fireworks {
  constructor(x, y, hue, targets) {
    this.x = x;
    this.y = y;
    this.hue = hue;
    this.lightness = 50;
    this.size = 15 + Math.random() * 10;
    const angle = Math.random() * 2 * Math.PI;
    const blastSpeed = 1 + Math.random() * 6;
    this.xSpeed = Math.cos(angle) * blastSpeed;
    this.ySpeed = Math.sin(angle) * blastSpeed;
    this.target = this.getTarget(targets);
    this.ttl = 100;
    this.timer = 0;
    this.fidelity = 3;
  }

  draw(ctx) {
    ctx.fillStyle = `hsl(${this.hue}, 100%, ${this.lightness}%)`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
  }
  update(canvas, shards) {
    if (this.target) {
      const dx = this.target.x - this.x;
      const dy = this.target.y - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const a = Math.atan2(dy, dx);
      const tx = Math.cos(a) * 5;
      const ty = Math.sin(a) * 5;
      this.size = lerp(this.size, 1.5, 0.05);

      if (dist < 5) {
        this.lightness = lerp(this.lightness, 100, 0.01);
        this.xSpeed = this.ySpeed = 0;
        this.x = lerp(this.x, this.target.x + this.fidelity / 2, 5);
        this.y = lerp(this.y, this.target.y + this.fidelity / 2, 5);
        this.timer += 1;
      } else if (dist < 10) {
        this.lightness = lerp(this.lightness, 100, 0.01);
        this.xSpeed = lerp(this.xSpeed, tx, 0.1);
        this.ySpeed = lerp(this.ySpeed, ty, 0.1);
        this.timer += 1;
      } else {
        this.xSpeed = lerp(this.xSpeed, tx, 0.02);
        this.ySpeed = lerp(this.ySpeed, ty, 0.02);
      }
    } else {
      this.ySpeed += 0.02;
      this.size = lerp(this.size, 1, 0.05);

      if (this.y > canvas.height) {
        shards.forEach((shard, idx) => {
          if (shard === this) {
            shards.splice(idx, 1);
          }
        });
      }
    }
    this.x = this.x + this.xSpeed;
    this.y = this.y + this.ySpeed;
    return shards;
  }

  getTarget(targets) {
    if (targets.length > 0) {
      const idx = Math.floor(Math.random() * targets.length);
      let { x, y } = targets[idx];
      targets.splice(idx, 1);

      x += window.innerWidth / 2 - textWidth / 2;
      y += window.innerWidth / 2 - fontSize / 2;

      return { x, y };
    }
  }
}

class Rocket {
  constructor(c2) {
    const quarterW = c2.width / 4;
    this.x = quarterW + Math.random() * (c2.width - quarterW);
    this.y = c2.height - 15;
    this.angle = (Math.random() * Math.PI) / 4 - Math.PI / 6;
    this.blastSpeed = 6 + Math.random() * 7;
    this.shardCount = 15 + Math.floor(Math.random() * 15);
    this.xSpeed = Math.sin(this.angle) * this.blastSpeed;
    this.ySpeed = -Math.cos(this.angle) * this.blastSpeed;
    this.hue = Math.floor(Math.random() * 360);
    this.trail = [];
  }
  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(Math.atan2(this.ySpeed, this.xSpeed) + Math.PI / 2);
    ctx.fillStyle = `hsl(${this.hue}, 100%, 50%)`;
    ctx.fillRect(0, 0, 5, 15);
    ctx.restore();
  }
  update() {
    this.x = this.x + this.xSpeed;
    this.y = this.y + this.ySpeed;
    this.ySpeed += 0.1;
  }

  explode(targets, shards) {
    for (let i = 0; i < 70; i++) {
      shards.push(new Fireworks(this.x, this.y, this.hue, targets));
    }
    return shards;
  }
}

const lerp = (a, b, t) => (Math.abs(b - a) > 0.1 ? a + t * (b - a) : b);

export default Rocket;
