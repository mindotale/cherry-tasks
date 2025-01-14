import { Task } from "../shared/task.model";

export interface AddEditTaskDialogData {
  editMode: boolean;
  task?: Task;
}