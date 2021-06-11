// import { Store } from 'vuex';
import ru from '../locals/ru.json';
import en from '../locals/en.json';
import store from '../store';

const locales: any = {
  'ru-Ru': ru,
  'en-En': en,
};

export default function lang(key: string) {
  const locale = store.getters.gInfo.lang;
  return locales[locale][key];
}
