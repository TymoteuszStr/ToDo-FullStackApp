import { createStore } from "vuex";
import taskModule, { TasksState } from "./modules/task.module";
import userModule, { UserState } from "./modules/user.module";

export interface State {
  tasksState: TasksState;
  UserState: UserState;
}
export default createStore({
  modules: { taskModule, userModule },
});
