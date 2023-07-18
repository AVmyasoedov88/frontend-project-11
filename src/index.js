import './style.css';
import 'bootstrap/js/dist/modal.js';
import i18next from 'i18next';
import init from './init.js';
import ru from './Text/ru.js';

const runApp = async () => {
  const i18nextInstance = i18next.createInstance();
  await i18nextInstance.init({
    lng: 'ru',
    debug: true,
    resources: ru,
  });

  init(i18nextInstance);
};
runApp();
// init();
