import axios from "axios";
import { ActionContext } from "vuex";
import Task from "@/models/taskModel";
import { State } from "..";
import { URI } from "@/config";
import {
  GET_TASKS,
  SET_TASKS,
  DELETE_TASK,
  DELETE_FROM_ALL_TASKS_ARRAY,
  POST_TASK,
  EDIT_TASK, EDIT_TASK_PROPERTY, UPDATE_TASK_IN_ALL_TASKS_ARRAY
} from "../types/task.type";

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
  [GET_TASKS]: async (context: ActionContext<TasksState, State>): Promise<void> =>
    new Promise<void>((resolve, reject) => {
      axios({
        method: "get",
        url: `${URI}/tasks`,
        headers: {
          "Content-Type": "application/json",
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

  [POST_TASK]: async (context: ActionContext<TasksState, State>, task: Task): Promise<void> =>
    new Promise<void>((resolve, reject) => {
      axios({
        method: "post",
        url: `${URI}/task`,
        headers: {
          "Content-Type": "application/json",
        },
        data: task,
      })
        .then((resp) => {
          resolve(resp.data);
        })
        .catch((err) => {
          console.log(err);
          reject();
        });
    }),

  [DELETE_TASK]: async (context: ActionContext<TasksState, State>, taskId: string): Promise<void> =>
    new Promise<void>((resolve, reject) => {
      axios({
        method: "delete",
        url: `${URI}/task/${taskId}`,
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((resp) => {
          context.commit(DELETE_FROM_ALL_TASKS_ARRAY, taskId);
          resolve(resp.data);
        })
        .catch((err) => {
          console.log(err);
          reject();
        });
    }),

  [EDIT_TASK]: async (
    context: ActionContext<TasksState, State>,
    { taskId, modifiedTask }: { taskId: string, modifiedTask: Task }
  ): Promise<void> =>
    new Promise<void>((resolve, reject) => {
      axios({
        method: "put",
        url: `${URI}/editTask/${taskId}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: modifiedTask,
      })
        .then((resp) => {
          resolve(resp.data);
        })
        .catch((err) => {
          console.log(err);
          reject();
        });
    }),

  [EDIT_TASK_PROPERTY]: async (
    context: ActionContext<TasksState, State>,
    { taskId, property }: { taskId: string, property: {} }
  ): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      axios({
        method: "patch",
        url: `${URI}/editTaskProperty/${taskId}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: property,
      })
        .then(({ data }) => {
          resolve();
          context.commit(UPDATE_TASK_IN_ALL_TASKS_ARRAY, data)
        })
        .catch((err) => {
          console.log(err);
          reject();
        });
    });
  }
};
const mutations = {
  [SET_TASKS]: (tasksState: TasksState, response: Task[]): void => {
    tasksState.allTasks = response;
  },
  [DELETE_FROM_ALL_TASKS_ARRAY]: (tasksState: TasksState, taskId: string): void => {
    const index = tasksState.allTasks.findIndex((el) => el._id === taskId);
    tasksState.allTasks.splice(index, 1);
  },
  [UPDATE_TASK_IN_ALL_TASKS_ARRAY]: (tasksState: TasksState, task: Task): void => {
    const index = tasksState.allTasks.findIndex((el) => el._id === task._id);
    tasksState.allTasks.splice(index, 1, task);
  },

};

export default {
  tasksState,
  getters,
  actions,
  mutations,
};
