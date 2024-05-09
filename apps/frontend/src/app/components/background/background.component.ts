import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GradientBlob } from './blob';

@Component({
  selector: 'app-background',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './background.component.html',
  styleUrl: './background.component.css',
})
export class BackgroundComponent implements OnInit {
  blobs: any[] = [];

  ngOnInit(): void {
    const canvas = document.getElementById(
      'canvas-background'
    ) as HTMLCanvasElement;
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;
    for (let i = 0; i < 10; i++) {
      this.blobs.push(
        new GradientBlob(
          Math.random() * canvas.width,
          canvas.height * Math.random(),
          Math.random() * 300 + 50,
          'blue'
        )
      );
    }
    this.loop(canvas);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    const width = event.target.innerWidth;
    const height = event.target.innerHeight;
    const canvas = document.getElementById(
      'canvas-background'
    ) as HTMLCanvasElement;
    canvas.width = width;
    canvas.height = height;
  }

  loop(canvas: any): void {
    const ctx = canvas.getContext('2d');

    // Add blur effect
    ctx.filter = 'blur(10px)';

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.blobs.forEach((blob) => {
      blob.update();
      blob.draw(ctx);
      blob.checkOnScreen(canvas);
      if (!blob.alive) {
        const index = this.blobs.indexOf(blob);
        this.blobs.splice(index, 1);
        const radius = Math.random() * 300 + 50;
        this.blobs.push(
          new GradientBlob(
            Math.random() * canvas.width,
            canvas.height + radius,
            radius,
            'blue'
          )
        );
      }
    });

    setTimeout(() => {
      this.loop(canvas);
    }, 1000 / 60);
  }
}
