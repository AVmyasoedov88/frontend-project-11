import axios from 'axios';
import parser from '../Parser/parser.js';
import validator from '../Validator/validator.js';
import getProxiUrl from './getProxiUrl.js';
import upDate from './update.js';
import makeModalWindow from '../Render/makeModalWindow.js';

const handlerRss = (state, watchedStateRsS, watchedErroR) => {
  const form = document.querySelector('.rss-form');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    validator(formData.get('url'), state)
      .then((rss) => {
        state.error.errorMessage = '';
        watchedStateRsS.form.value = rss;
        watchedStateRsS.form.btnAddStatus = 'send';
      })

      .then(() => getProxiUrl(state.form.value))
      .then((newUrl) =>
        axios.get(newUrl.toString()).catch(() => {
          throw new Error(state.i18n.t('form.errorAxios'));
        })
      )
      .then((response) => parser(response))
      .then(([feeds, topics]) => {
        state.form.urls.push(state.form.value);
        watchedStateRsS.content.feeds.push(feeds);
        watchedStateRsS.content.topics.push(topics);
      })
      .then(() => {
        setTimeout(() => upDate(state, watchedStateRsS, watchedErroR), 5000);
      })

      .then(() => makeModalWindow(state))

      .catch((err) => {
        // watchedErroR.errorStatus = false;
        watchedErroR.errorMessage = err.message;
      })
      .finally(() => {
        watchedStateRsS.form.btnAddStatus = 'notSend';
        console.log(state);
      });
  });
};
export default handlerRss;
