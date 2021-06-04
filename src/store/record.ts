import {
  Module, VuexModule, Mutation, Action,
// eslint-disable-next-line import/no-extraneous-dependencies
} from 'vuex-module-decorators';
import firebase from 'firebase/app';

export interface IRecord {
  id: string | null, // ? null зачем?
  data: object,
}

@Module
export default class records extends VuexModule {
  @Action
  async addRecord(dataRecord: object): Promise<IRecord> {
    try {
      const uid = await this.context.dispatch('getUid');
      // eslint-disable-next-line no-shadow
      const records = await firebase.database().ref(`/users/${uid}/records/`).push(dataRecord);
      console.log(typeof (records.key));
      return {
        id: records.key,
        data: dataRecord,
      };
    } catch (e) {
      this.context.commit('setError', e);
      throw (e);
    }
  }

  @Action
  async getListRecord() {
    try {
      const uid = await this.context.dispatch('getUid');
      const ref = (await firebase.database()
        .ref(`/users/${uid}/records/`).once('value')).val();
      if (!ref) {
        return false;
      }
      // eslint-disable-next-line no-shadow
      const records : any = [];
      Object.entries(ref).forEach(([key, value] : any) => {
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
      this.context.commit('setError', e);
      throw (e);
    }
  }
}

// export default {
//   actions: {
//     async addRecord({ commit, dispatch }: any, dataRecord: any) {
//       try {
//         const uid = await dispatch('getUid');
//         console.log(uid);
//         const records = await firebase.database().ref(`/users/${uid}/records/`)
//           .push(
//             dataRecord,
//           );

//         console.log(dataRecord);
//         return {
//           id: records.key,
//           data: dataRecord,
//         };
//       } catch (e) {
//         commit('setError', e);
//         throw (e);
//       }
//     },

//     async getListRecord({ dispatch, commit } :any) {
//       try {
//         const uid = await dispatch('getUid');
//         const ref = (await firebase.database()
// .ref(`/users/${uid}/records/`).once('value')).val();
//         if (!ref) {
//           return false;
//         }
//         const records : any = [];
//         Object.entries(ref).forEach(([key, value] : any) => {
//           records.push({
//             id: value.categoryId,
//             idRecord: key,
//             amount: value.amount,
//             type: value.type,
//             date: value.date,
//           });
//         });
//         return records;
//       } catch (e) {
//         commit('setError', e);
//         throw (e);
//       }
//     },

//     async getListRecordById({ dispatch, commit } :any, id: any) {
//       try {
//         const uid = await dispatch('getUid');
//         const ref = (await firebase.database().ref(`/users/${uid}/records`)
// .child(id).once('value')).val();
//         if (ref.type === 'income') { ref.class = 'green'; } else {
//           ref.class = 'red';
//         }
//         return { ...ref, id };
//       } catch (e) {
//         commit('setError', e);
//         throw (e);
//       }
//     },

//   },
// };
