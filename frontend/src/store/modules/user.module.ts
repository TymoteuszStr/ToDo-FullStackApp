import axios from "axios";
import { ActionContext } from "vuex";
import { State } from "..";
import { URI } from "@/config";
import { LOGIN, SET_USER } from "../types/user.type";
import User from "@/models/userModel"

export interface UserState {
  user: User | undefined
}
const userState: UserState = {
  user: undefined
}

const getters = {
  user: (userState: UserState): User | undefined => userState.user,
};
const actions = {
  [LOGIN]: async (context: ActionContext<UserState, State>, { login, password }: { login: string, password: string }): Promise<void> =>
    new Promise<void>((resolve, reject) => {
      axios({
        method: "post",
        url: `${URI}/login`,
        headers: {
          "Content-Type": "application/json",
        },
        data: { login, password },
      })
        .then((resp) => {
          context.commit(SET_USER, resp.data)
          resolve();
        })
        .catch((err) => {
          console.log(err);
          reject();
        });
    }),
};
const mutations = {
  [SET_USER]: (userState: UserState, data: User): void => {
    userState.user = data;
  },

};

export default {
  userState,
  getters,
  actions,
  mutations,
};