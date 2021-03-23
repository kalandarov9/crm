import firebase from 'firebase/app';

export default {
  actions: {
    // eslint-disable-next-line no-unused-vars
    async login({ dispatch, commit }, { email, password }) {
      // eslint-disable-next-line no-useless-catch
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
      } catch (e) {
        throw (e);
      }
    },

    // eslint-disable-next-line no-unused-vars
    async register({ dispatch, commit }, { email, password }) {
      await firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          const { user } = userCredential;
          console.log(user);
        })
        .catch((e) => {
          // const errorCode = error.code;
          // const errorMessage = error.message;
          // ..
          console.log(e.message);
        });
    },

    async logout() {
      await firebase.auth().signOut();
    },

  },
};
