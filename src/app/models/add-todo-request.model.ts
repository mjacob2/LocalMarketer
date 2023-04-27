export class AddTodoRequestModel {
  public title: string = '';
  public dealId?: number;
  public dueDate?: Date;
  public dealEndDate?: Date;
  public dealCreationDate?: Date;
  public isFinished?: boolean;
  public userId?: number;
  public description: string = '';
}
