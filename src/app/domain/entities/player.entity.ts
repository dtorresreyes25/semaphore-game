export class PlayerEntity {
  constructor(
    public name: string,
    public score = 0,
    public maxScore = 0
  ) {}

  public resetAllScore(): void {
    this.score = 0;
  }

  public decreaseScoreByOne(): void {
    if (this.score > 0) {
      this.score--;
    }
  }

  public increaseScoreByOne(): void {
    this.score++;

    if (this.score >= this.maxScore) {
      this.increaseMaxScoreByOne();
    }
  }

  public increaseMaxScoreByOne(): void {
    this.maxScore++;
  }
}
