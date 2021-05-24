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

        console.log(dataRecord);
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
        if (!ref) {
          return false;
        }
        const records = [];
        // eslint-disable-next-line no-unused-vars
        Object.entries(ref).forEach(([key, value]) => {
          records.push({
            id: value.categoryId,
            idRecord: key,
            amount: value.amount,
            type: value.type,
            date: value.date,
          });
        });
        return records;
      } catch (e) {
        commit('setError', e);
        throw (e);
      }
    },

    async getListRecordById({ dispatch, commit }, id) {
      try {
        const uid = await dispatch('getUid');
        const ref = (await firebase.database().ref(`/users/${uid}/records`).child(id).once('value')).val();
        if (ref.type === 'income') { ref.class = 'green'; } else {
          ref.class = 'red';
        }
        return { ...ref, id };
      } catch (e) {
        commit('setError', e);
        throw (e);
      }
    },

  },
};
