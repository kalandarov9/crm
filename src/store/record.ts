import {
  Module, VuexModule, Mutation, Action,
} from 'vuex-module-decorators';
import firebase from 'firebase/app';
import { IDataRecord } from '@/api/interfaces';

export interface IRecord {
  id: firebase.database.Reference['key'],
  data: IDataRecord,
}

export interface IAllRecords {
  id: string,
  idRecord: string,
  amount: number,
  type: string,
  date?: Date
}

@Module
export default class records extends VuexModule {
  @Action
  async addRecord(dataRecord: IDataRecord): Promise<IRecord> {
    try {
      const uid: string = await this.context.dispatch('getUid');
      const record = await firebase.database().ref(`/users/${uid}/records/`).push(dataRecord);
      console.log(typeof (record.key));
      return {
        id: record.key,
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
      const uid: string = await this.context.dispatch('getUid');
      /// Как описать Interface
      const ref: object = (await firebase.database()
        .ref(`/users/${uid}/records/`).once('value')).val();
      if (!ref) {
        return false;
      }
      const allRecords: IAllRecords[] = [];
      Object.entries(ref).forEach(([key, value] : any) => {
        allRecords.push({
          id: value.categoryId,
          idRecord: key,
          amount: value.amount,
          type: value.type,
          date: value.date,
        });
      });
      return allRecords;
    } catch (e) {
      this.context.commit('setError', e);
      throw (e);
    }
  }

  @Action
  async getListRecordById(id: string): Promise<IRecord> {
    try {
      const uid: string = await this.context.dispatch('getUid');
      const ref = (await firebase.database().ref(`/users/${uid}/records`)
        .child(id).once('value')).val();
      if (ref.type === 'income') { ref.class = 'green'; } else {
        ref.class = 'red';
      }
      return { ...ref, id };
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
