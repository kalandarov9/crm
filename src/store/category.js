/* eslint-disable consistent-return */
import firebase from 'firebase/app';

export default {

  actions: {

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

    async editCategory({ dispatch, commit }, { id, name, minValue }) {
      try {
        const uid = await dispatch('getUid');
        await firebase.database().ref(`/users/${uid}/categories/${id}`).update({ name, minValue });
        return { name, minValue, id };
      } catch (e) {
        commit('setError', e);
        throw (e);
      }
    },

    async getListsCategory({ dispatch, commit }) {
      try {
        const uid = await dispatch('getUid');
        const ref = (await firebase.database().ref(`/users/${uid}/categories/`).once('value')).val();

        const categories = [];
        Object.entries(ref).forEach(([key, value]) => {
          categories.push({
            id: key,
            name: value.name,
            minValue: value.minValue,
          });
        });

        return categories;
      } catch (e) {
        commit('setError', e);
        throw (e);
      }
    },

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
