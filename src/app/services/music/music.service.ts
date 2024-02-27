import { Injectable } from '@angular/core';
import { Howl } from 'howler';

@Injectable({
  providedIn: 'root',
})
export class MusicService {
  private backgroundMusic: Howl;
  private errorSound: Howl;

  constructor() {
    this.backgroundMusic = new Howl({
      src: ['assets/mp3/song.mp3'],
      loop: true,
      volume: 0.5,
    });

    this.errorSound = new Howl({
      src: ['assets/mp3/error.mp3'],
      volume: 1,
    });
  }

  public playBackgroundMusic(): void {
    this.backgroundMusic.play();
  }

  public pauseBackgroundMusic(): void {
    this.backgroundMusic.pause();
  }

  public playErrorSound(): void {
    this.errorSound.play();
  }

  private calculatePlaybackRate(adjustedGreenDuration: number): number {
    const rateIncrement = 0.1;
    const maxRate = 2;
    const maxDuration = 10000;
    const rate = 1 + ((maxDuration - adjustedGreenDuration) / maxDuration) * rateIncrement;
    return Math.min(rate, maxRate);
  }

  public setPlaybackRate(greenSemaphoreDuration: number): void {
    const playbackRate = this.calculatePlaybackRate(greenSemaphoreDuration);
    this.backgroundMusic.rate(playbackRate);
  }
}
