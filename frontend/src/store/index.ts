import { createStore } from "vuex";
import taskModule, { TasksState } from "./modules/task.module";
import userModule, { UserState } from "./modules/user.module";
import VuexPersistence from 'vuex-persist'

export interface State {
  tasksState: TasksState;
  userState: UserState;
}

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

export default createStore({
  plugins: [vuexLocal.plugin],
  modules: { taskModule, userModule },
});
