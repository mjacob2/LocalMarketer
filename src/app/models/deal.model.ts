import { ToDoGeneral } from './todoGeneral.model';

export class Deal {
  public id?: number; //
  public creationDate?: Date; //
  public creatorId?: number;
  public profileId?: number;
  public endDate?: Date; //
  public name?: string; //
  public price?: number; //
  public description?: string; //
  public stage?: string; //
  public toDos?: ToDoGeneral[];
}
