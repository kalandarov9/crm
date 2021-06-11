import {
  Module, VuexModule, Mutation, Action,
} from 'vuex-module-decorators';
import firebase from 'firebase/app';

export interface IInfo {
  bill: number,
  lang: string,
  name?: string,
}

// Вопрос???
@Module
export default class records extends VuexModule {
  info = {};

  @Mutation
  setInfo(info: IInfo) {
    this.info = info;
  }

  @Mutation
  clearInfo() {
    this.info = {};
  }

  @Action
  async updateInfo(data: IInfo) {
    try {
      const uid: string = await this.context.dispatch('getUid');
      const updateData = { ...this.info, ...data };
      await firebase.database().ref(`/users/${uid}/info`).update(updateData);
      this.context.commit('setInfo', updateData);
    } catch (e) {
      this.context.commit('setError', e);
      throw (e);
    }
  }

  @Action
  async fetchInfo() {
    try {
      const uid: string = await this.context.dispatch('getUid');
      const info = await (await (firebase.database().ref(`/users/${uid}/info`).once('value'))).val();
      this.context.commit('setInfo', info);
    } catch (e) {
      this.context.commit('setError', e);
      throw (e);
    }
  }

  get gInfo() {
    return this.info;
  }

  // state: {
  //   info: {} as IInfo,
  // },
  // mutations: {
  //   setInfo(state, info) {
  //     state.info = info;
  //   },

  //   clearInfo(state) {
  //     state.info = {};
  //   },
  // },
  // actions: {
  //   async updateInfo({ dispatch, commit, getters }, data) {
  //     try {
  //       const uid = await dispatch('getUid');
  //       const updateData = { ...getters.info, ...data };
  //       await firebase.database().ref(`/users/${uid}/info`).update(updateData);
  //       commit('setInfo', updateData);
  //     } catch (e) {
  //       commit('setError', e);
  //       throw (e);
  //     }
  //   },

  //   async fetchInfo({ dispatch, commit }) {
  //     try {
  //       const uid = await dispatch('getUid');
  //       const info = await (await (firebase.database().ref(`/users/${uid}/info`)
  // .once('value'))).val();
  //       commit('setInfo', info);
  //     } catch (e) {
  //       commit('setError', e);
  //       throw (e);
  //     }
  //   },
  // },
  // getters: {
  //   info: (s) => s.info,
  // },
}
