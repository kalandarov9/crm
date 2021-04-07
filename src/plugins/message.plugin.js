/* eslint-disable no-undef */
/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
import M from 'materialize-css';

export default {
  install(Vue) {
    Vue.prototype.$message = (html) => {
      M.toast({ html });
    };

    Vue.prototype.$error = (html) => {
      M.toast({ html: `[Ошибка]: ${html}` });
    };
  },
};
