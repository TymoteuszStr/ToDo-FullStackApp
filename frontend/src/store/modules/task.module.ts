import axios from "axios";
import { getToken } from "@/services/jwt.service";
import { ActionContext } from "vuex";
import Task from "@/models/taskModel";
import { State } from "..";
import { URI } from "@/config";
import {
  GET_TASKS,
  CLEAR_TASKS,
  SET_TASKS,
  DELETE_TASK,
  DELETE_FROM_ALL_TASKS_ARRAY,
  POST_TASK,
  UPDATE_TASK, UPDATE_TASK_PROPERTY,
  UPDATE_TASK_IN_ALL_TASKS_ARRAY,
  PUSH_NEW_TASK_TO_ALL_TASK_ARRAY
} from "../types/task.type";

export interface TasksState {
  allTasks: Task[]
}
const tasksState: TasksState = {
  allTasks: [],
};
const getters = {
  allTasks: (tasksState: TasksState): Task[] => tasksState.allTasks,
};
const actions = {
  [GET_TASKS]: async ({ commit, getters }: ActionContext<TasksState, State>): Promise<void> =>
    new Promise<void>((resolve, reject) => {
      const userId = getters.user?.id
      axios({
        method: "get",
        url: `${URI}/tasks/${userId}`,
        headers: {
          "Authorization": `Bearer ${getToken()}`,
          "Content-Type": "application/json",
        },
      })
        .then((resp) => {
          commit(SET_TASKS, resp.data);
          resolve(resp.data);
        })
        .catch((err) => {
          console.log(err);
          reject();
        });
    }),

  [POST_TASK]: async (context: ActionContext<TasksState, State>, task: any): Promise<void> =>
    new Promise<void>((resolve, reject) => {
      const userId = context.getters.user?.id
      axios({
        method: "post",
        url: `${URI}/task`,
        headers: {
          "Authorization": `Bearer ${getToken()}`,
          "Content-Type": "application/json",
        },
        data: { task: { ...task, userId } }

      })
        .then((resp) => {
          context.commit(PUSH_NEW_TASK_TO_ALL_TASK_ARRAY, resp.data)
          resolve();
        })
        .catch((err) => {
          console.log(err);
          reject();
        });
    }),

  [DELETE_TASK]: async (context: ActionContext<TasksState, State>, taskId: string): Promise<void> =>
    new Promise<void>((resolve, reject) => {
      const userId = context.getters.user?.id
      axios({
        method: "delete",
        url: `${URI}/task/${taskId},${userId}`,
        headers: {
          "Authorization": `Bearer ${getToken()}`,
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

  [UPDATE_TASK]: async (
    context: ActionContext<TasksState, State>,
    { taskId, modifiedTask }: { taskId: string, modifiedTask: Task }
  ): Promise<void> =>
    new Promise<void>((resolve, reject) => {
      axios({
        method: "put",
        url: `${URI}/updateTask/${taskId}`,
        headers: {
          "Authorization": `Bearer ${getToken()}`,
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

  [UPDATE_TASK_PROPERTY]: async (
    context: ActionContext<TasksState, State>,
    { taskId, property }: { taskId: string, property: {} }
  ): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      const userId = context.getters.user?.id
      axios({
        method: "patch",
        url: `${URI}/updateTaskProperty/${taskId}`,
        headers: {
          "Authorization": `Bearer ${getToken()}`,
          "Content-Type": "application/json",
        },
        data: { property, userId },
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
  [PUSH_NEW_TASK_TO_ALL_TASK_ARRAY]: (tasksState: TasksState, task: Task): void => {
    tasksState.allTasks.push(task);
  },
  [DELETE_FROM_ALL_TASKS_ARRAY]: (tasksState: TasksState, taskId: string): void => {
    const index = tasksState.allTasks.findIndex((el) => el._id === taskId);
    tasksState.allTasks.splice(index, 1);
  },
  [UPDATE_TASK_IN_ALL_TASKS_ARRAY]: (tasksState: TasksState, task: Task): void => {
    const index = tasksState.allTasks.findIndex((el) => el._id === task._id);
    tasksState.allTasks.splice(index, 1, task);
  },
  [CLEAR_TASKS]: (tasksState: TasksState): void => {
    tasksState.allTasks = []
  }

};

export default {
  tasksState,
  getters,
  actions,
  mutations,
};
