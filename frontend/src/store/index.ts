import { createStore } from "vuex";
import taskModule, { TasksState } from "./modules/task.module";

export interface State {
  tasksState: TasksState;
}
export default createStore({
  modules: { taskModule },
});
