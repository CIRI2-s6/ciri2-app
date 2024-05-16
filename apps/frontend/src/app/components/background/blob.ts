export class GradientBlob {
  public start: number;
  public alive: boolean;
  public speedY: number;
  public waveSpeed: number;
  public randomStartPoint: number;

  constructor(
    public x: number,
    public y: number,
    public r: number,
    public color: string
  ) {
    this.start = Date.now();
    this.alive = true;
    this.speedY = -Math.random() * 2 - 0.2;
    this.waveSpeed = Math.random() * 0.1;
    this.randomStartPoint = Math.random() * 100000;
    this.color = `hsla(170,70%,60%,0.2)`;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
    ctx.fillStyle = this.color;

    ctx.fill();
  }

  update(): void {
    this.x +=
      Math.sin(
        (Date.now() - this.start + this.randomStartPoint) /
          (1000 + 1000 * this.waveSpeed)
      ) / 1;
    this.y += this.speedY;
  }

  checkOnScreen(): void {
    if (this.y + this.r < 0) {
      this.alive = false;
    }
  }
}
