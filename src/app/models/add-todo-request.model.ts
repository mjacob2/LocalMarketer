export class AddTodoRequestModel {
  public title?: string;
  public dealId?: number;
  public dueDate?: Date;
  public dealEndDate?: Date;
  public isFinished?: boolean;
  public description: string = '';
}
