import type {
  ActionContext,
  ActionTree,
  GetterTree,
  Module,
  MutationTree,
} from "vuex";
import { DataStatus } from "@/common/enums/enums";
import {
  auth as authService,
  storage as storageService,
} from "@/services/services";
import type { RootState } from "../root-state";
import type { State } from "./state";
import type {
  UserSignInRequestDto,
  UserSignUpRequestDto,
  UserWithGrantDto,
} from "@/common/types/types";
import { StorageKey } from "@/common/enums/enums";

enum Actions {
  SIGN_IN = "signIn",
  SIGN_UP = "signUp",
  GET_CURRENT_USER = "getCurrentUser",
  LOG_OUT = "logOut",
}

enum Mutations {
  SET_USER = "setUser",
  CLEAR_USER = "clearUser",
}

const state: State = {
  currentUser: null,
  dataStatus: DataStatus.IDLE,
};

const getters: GetterTree<State, RootState> = {};

const mutations: MutationTree<State> = {
  [Mutations.SET_USER](state: State, newUser: UserWithGrantDto) {
    state.currentUser = newUser;
  },

  [Mutations.CLEAR_USER](state: State) {
    state.currentUser = null;
  },
};

const actions: ActionTree<State, RootState> = {
  async [Actions.SIGN_IN](
    { commit }: ActionContext<State, RootState>,
    signinDto: UserSignInRequestDto
  ) {
    state.dataStatus = DataStatus.PENDING;
    const { token, user } = await authService.signIn(signinDto);
    storageService.setToken(token);

    commit(Mutations.SET_USER, user);
    state.dataStatus = DataStatus.FULFILLED;
  },

  async [Actions.SIGN_UP](
    { commit }: ActionContext<State, RootState>,
    signUpDto: UserSignUpRequestDto
  ) {
    state.dataStatus = DataStatus.PENDING;
    const { token, user } = await authService.signUp(signUpDto);
    storageService.setToken(token);

    commit(Mutations.SET_USER, user);
    state.dataStatus = DataStatus.FULFILLED;
  },

  async [Actions.GET_CURRENT_USER]({
    commit,
  }: ActionContext<State, RootState>) {
    const isTokenInStorage = Boolean(storageService.getItem(StorageKey.TOKEN));

    if (isTokenInStorage) {
      state.dataStatus = DataStatus.PENDING;
      const user = await authService.getCurrentUser();

      commit(Mutations.SET_USER, user);
      state.dataStatus = DataStatus.FULFILLED;
    }
  },

  async [Actions.LOG_OUT]({ commit }: ActionContext<State, RootState>) {
    state.dataStatus = DataStatus.PENDING;

    commit(Mutations.CLEAR_USER);
    storageService.clearToken();
    state.dataStatus = DataStatus.FULFILLED;
  },
};

const auth: Module<State, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

export { auth };
