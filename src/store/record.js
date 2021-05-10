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

    async getListRecord({ dispatch, commit }) {
      try {
        const uid = await dispatch('getUid');
        const ref = (await firebase.database().ref(`/users/${uid}/records/`).once('value')).val();

        const records = [];
        // eslint-disable-next-line no-unused-vars
        Object.entries(ref).forEach(([key, value]) => {
          records.push({
            id: value.categoryId,
            amount: value.amount,
            type: value.type,
          });
        });

        return records;
      } catch (e) {
        commit('setError', e);
        throw (e);
      }
    },

  },
};
