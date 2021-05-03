/* eslint-disable consistent-return */
import firebase from 'firebase/app';

export default {

  actions: {

    async addRecord({ commit, dispatch }, dataRecord) {
      try {
        const uid = await dispatch('getUid');
        const records = await firebase.database().ref(`/users/${uid}/records/`)
          .push(
            dataRecord,
          );
        return {
          id: records.key,
          data: dataRecord,
        };
      } catch (e) {
        commit('setError', e);
        throw (e);
      }
    },
  },
};
