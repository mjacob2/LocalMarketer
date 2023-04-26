export interface ToDoList {
  id: number;
  creationDate: Date;
  title: string;
  profileId: number;
  profileName: string;
  dueDate: Date;
  isFinished: boolean;
  userFullName: string;
}
