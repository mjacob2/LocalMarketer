import { XNote } from './XNote.model';

export class XToDo {
  public toDoId?: number;
  public creationDate?: Date;
  public creatorId?: number;
  public title?: string;
  public dealId?: number;
  public dueDate?: Date;
  public executionDate?: Date;
  public description?: string;
  public isFinished?: boolean;
  public link1?: string;
  public link2?: string;
  public link3?: string;
  public link4?: string;
  public link5?: string;
  public forRole?: string;
  public notes?: XNote[];

  public dealEndDate?: Date;
  public dealCreationDate?: Date;
  public profileId?: number;
  public profileName?: string;
}
