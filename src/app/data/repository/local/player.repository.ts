import { Injectable } from '@angular/core';
import { attempt, cloneDeep, isError } from 'lodash';
import { Observable, of } from 'rxjs';

import { PlayerEntity } from '../../../domain/entities/player.entity';
import { IPlayerRepository } from '../../../domain/interfaces/player-repository.interface';

const COLLECTION_NAME = 'semaphore-game-players';

@Injectable()
export class PlayerRepository implements IPlayerRepository {
  private entities: PlayerEntity[] = [];
  private localStorage: Storage = window.localStorage;

  public constructor() {
    this.load();
  }

  public get(name: string): Observable<PlayerEntity | null> {
    const entity = this.entities.find(entity => entity.name === name)!;
    const entityClone = entity ? cloneDeep(entity) : null;
    return of(entityClone);
  }

  public all(): Observable<PlayerEntity[]> {
    return of(cloneDeep(this.entities));
  }

  public create(entityData: PlayerEntity): Observable<PlayerEntity> {
    this.entities.push(cloneDeep(entityData));
    this.save();
    return of(entityData);
  }

  public update(entityData: PlayerEntity): Observable<PlayerEntity> {
    const entity = this.entities.find(entity => entity.name === entityData.name)!;
    Object.assign(entity, entityData);
    this.save();
    return of(entityData);
  }

  private load(): void {
    const entityStr = this.localStorage.getItem(COLLECTION_NAME);
    if (entityStr) {
      const parseResult = attempt(JSON.parse.bind(null, entityStr)) as Error | PlayerEntity[];
      this.entities = isError(parseResult) ? [] : parseResult;
    }
  }

  private save(): void {
    const entityStr = JSON.stringify(this.entities);
    this.localStorage.setItem(COLLECTION_NAME, entityStr);
  }
}
