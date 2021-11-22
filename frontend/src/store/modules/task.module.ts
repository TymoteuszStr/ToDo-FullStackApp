import axios from 'axios';
import { ActionContext } from 'vuex';
import Task from 'models/taskModel';
import { GET_TASKS, SET_TASKS } from '../types/task.type';
import { State } from '..';
import { URI } from 'config';

export interface TasksState {
  allTasks: Task[];
}
const tasksState: TasksState = {
  allTasks: [],
};
const getters = {
  allTasks: (tasksState: TasksState): Task[] => tasksState.allTasks,
};
const actions = {
  [GET_TASKS]: async (context: ActionContext<TasksState, State>) =>
    new Promise<void>((resolve, reject) => {
      axios({
        method: 'get',
        url: `${URI}/tasks`,
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((resp) => {
          context.commit(SET_TASKS, resp.data);
          resolve(resp.data);
        })
        .catch((err) => {
          console.log(err);
          reject();
        });
    }),
};
const mutations = {
  [SET_TASKS]: (tasksState: TasksState, response: Task[]) => {
    tasksState.allTasks = response;
  },
};

export default {
  tasksState,
  getters,
  actions,
  mutations,
};
