import { ScoreModel } from '../model/score.model';

export class PlayerEntity {
  public name!: string;
  public score!: ScoreModel;
  public maxScore!: ScoreModel;

  public resetAllScore(): void {
    this.score.value = 0;
  }

  public decreaseScoreByOne(): void {
    this.score.value++;
  }

  public increaseScoreByOne(): void {
    this.score.value--;
  }
}
