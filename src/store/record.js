/* eslint-disable consistent-return */
import firebase from 'firebase/app';

export default {

  actions: {
    async mauthBill({ commit, dispatch }, { type, amount }) {
      try {
        const uid = await dispatch('getUid');
        if (type === 'income') {
          const a = (await firebase.database().ref(`/users/${uid}/info/bill/`).once('value')).val();
          const bill = a + amount;
          await firebase.database().ref(`/users/${uid}/info/`).update({ bill, name: 'Ura' });
          return bill;
        }
        const a = (await firebase.database().ref(`/users/${uid}/info/bill/`).once('value')).val();
        const bill = a - amount;
        if (bill <= 0) {
          console.log('stop');
          return false;
        }
        await firebase.database().ref(`/users/${uid}/info/`).update({ bill, name: 'Ura' });
        return bill;
      } catch (e) {
        commit('setError', e);
        throw (e);
      }
    },

    async addRecord({ dispatch }, {
      name, type, amount, description, date,
    }) {
      try {
        const uid = await dispatch('getUid');
        const records = await firebase.database().ref(`/users/${uid}/records/${name}`)
          .push({
            type, amount, description, date,
          });
        return {
          id: records.key, name, type, amount, description, date,
        };
      } catch (e) {
        console.log(e);
      }
    },
  },
};
