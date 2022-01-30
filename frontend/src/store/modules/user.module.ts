import axios from "axios";
import { ActionContext } from "vuex";
import { State } from "..";
import { URI } from "@/config";
import { LOGIN, SET_USER, REGISTER, CLEAR_USER } from "../types/user.type";
import IUser from "@/models/userModel"
import { saveToken } from "@/services/jwt.service"

export interface UserState {
  user: IUser | undefined
}
const userState: UserState = {
  user: undefined
}

const getters = {
  user: (userState: UserState): IUser | undefined => userState.user,
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
          saveToken(resp.data.token)
          context.commit(SET_USER, { id: resp.data.userId, name: resp.data.userName })
          resolve();
        })
        .catch((err) => {
          console.log(err);
          reject();
        });
    }),

  [REGISTER]: async (context: ActionContext<UserState, State>, { login, password }: { login: string, password: string }): Promise<{}> =>
    await axios({
      method: "post",
      url: `${URI}/register`,
      headers: {
        "Content-Type": "application/json",
      },
      data: { login, password }
    })

};
const mutations = {
  [SET_USER]: (userState: UserState, data: IUser): void => {
    userState.user = data;
  },
  [CLEAR_USER]: (userState: UserState): void => {
    userState.user = undefined
  }

};

export default {
  userState,
  getters,
  actions,
  mutations,
};
