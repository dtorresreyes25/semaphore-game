export class PlayerEntity {
  public name!: string;
  public score!: number;
  public maxScore!: number;

  constructor(name: string) {
    this.name = name;
    this.score = 0;
    this.maxScore = 0;
  }

  public resetAllScore(): void {
    this.score = 0;
  }

  public decreaseScoreByOne(): void {
    this.score++;
  }

  public increaseScoreByOne(): void {
    this.score--;
  }
}
