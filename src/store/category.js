/* eslint-disable consistent-return */
import firebase from 'firebase/app';

export default {

  actions: {
    // eslint-disable-next-line no-unused-vars
    async createCategory({ dispatch, commit }, { name, minValue }) {
      try {
        const uid = await dispatch('getUid');
        const check = await dispatch('checkCategory', { name });
        if (check) {
          return false;
        }
        const category = await firebase.database().ref(`/users/${uid}/categories/`).push({ name, minValue });
        return { name, minValue, id: category.key };
      } catch (e) {
        commit('setError', e);
        throw (e);
      }
    },

    // eslint-disable-next-line no-unused-vars
    async checkCategory({ dispatch, commit }, { name }) {
      try {
        const uid = await dispatch('getUid');
        const ref = await (firebase.database().ref(`/users/${uid}/categories/`).once('value'));
        const t = ref.val();
        const res = Object.values(t).map((e) => e.name.toLowerCase()).indexOf(name.toLowerCase());
        if (res !== -1) {
          return true;
        }
        return false;
      } catch (e) {
        commit('setError', e);
        throw (e);
      }
    },
  },
};
