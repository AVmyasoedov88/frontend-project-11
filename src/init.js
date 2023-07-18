import i18next from 'i18next';
import { setLocale } from 'yup';
import axios from 'axios';
import _ from 'lodash';
import watchedStateRss from './View/watcherFormRss.js';
import ru from './Text/ru.js';

import parser from './Parser/parser.js';
import validator from './Validator/validator.js';
import getProxiUrl from './Handlers/getProxiUrl.js';
import updatePosts from './Handlers/updatePosts.js';
import makeModalWindow from './Handlers/makeModalWindow.js';


const init = (i18nextInstance) => {
  const elements = {
    form: document.querySelector('.rss-form'),
    btnAdd: document.querySelector('.h-100, btn btn-lg btn-primary px-sm-5'),
    feedback: document.querySelector('.feedback'),
    input: document.querySelector('.form-control'),
  };

  setLocale({
    mixed: {
      default: 'field_invalid',
    },
    string: {
      min: i18nextInstance.t('form.errorLength'),
      url: i18nextInstance.t('form.errorURL'),
    },
  });

  const state = {
    content: {
      feeds: [],
      topics: [],
    },
    form: {
      value: '',
      urls: [],
      btnAddStatus: 'notSend',
      statusRss: false,
    },
    error: {
      errorMessage: null,
      errorStatus: null,
    },
    modal: {
      viewPosts: [],
      modalPostId: null,
    },
  };

  const watchedStateRsS = watchedStateRss(state, i18nextInstance, elements);
  //setTimeout(() => updatePosts(state, i18nextInstance, watchedStateRsS), 5000);

  elements.form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    validator(formData.get('url'), state, i18nextInstance)
      .then((rss) => {
        state.error.errorMessage = '';
        state.form.value = rss;
        watchedStateRsS.form.btnAddStatus = 'send';
        watchedStateRsS.form.statusRss = false;
      })
      .then(() => getProxiUrl(state.form.value))
      .then((newUrl) =>
        axios.get(newUrl).catch(() => {
          throw new Error(i18nextInstance.t('form.errorAxios'));
        }),
      )
      .then((response) => {
        const result = parser(state, i18nextInstance, response);

        const [feeds, topics] = result;
        console.log(topics);
        topics.forEach((topic) => (topic.id = _.uniqueId()));
        console.log(topics);
        watchedStateRsS.form.statusRss = true;
        state.form.urls.push(state.form.value);
        watchedStateRsS.content.feeds.push(feeds);
        watchedStateRsS.content.topics.push(topics);
        setTimeout(
          () => updatePosts(state, i18nextInstance, watchedStateRsS),
          5000,
        );
        makeModalWindow(state, watchedStateRsS);
      })
      /* .then(([feeds, topics]) => {
        watchedStateRsS.form.statusRss = true;
        state.form.urls.push(state.form.value);
        watchedStateRsS.content.feeds.push(feeds);
        watchedStateRsS.content.topics.push(topics);
      })
      .then(() => {
        setTimeout(
          () => upDate(state, i18nextInstance, watchedStateRsS, id),
          5000,
        );
      })
      .then(() => makeModalWindow(state)) */
      .catch((err) => {
        // watchedErroR.errorStatus = false;
        watchedStateRsS.errorMessage = err.message;
      })
      .finally(() => {
        watchedStateRsS.form.btnAddStatus = 'notSend';
        // console.log(state)
        setTimeout(
          () => updatePosts(state, i18nextInstance, watchedStateRsS),
          5000,
        );
      });
  });
};
const runApp = async () => {
  const i18nextInstance = i18next.createInstance();
  await i18nextInstance.init({
    lng: 'ru',
    debug: true,
    resources: ru,
  });

  init(i18nextInstance);
};

runApp()
export default init;
