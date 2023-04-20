import { ToDoGeneral } from './todoGeneral.model';

export class DealGeneral {
  constructor(
    public id: number,
    public name?: string,
    public description?: string,
    public toDos: ToDoGeneral[] = []
  ) {}
}
