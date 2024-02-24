import { PlayerEntity } from '../entities/player.entity';

export abstract class IPlayerRepository {
  abstract all(): PlayerEntity[];
  abstract get(name: string): PlayerEntity;
  abstract save(player: PlayerEntity): void;
  abstract create(player: PlayerEntity): PlayerEntity;
}
