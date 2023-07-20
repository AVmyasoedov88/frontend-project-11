/* eslint-disable function-paren-newline, no-return-assign */
import i18next from 'i18next';
import { setLocale } from 'yup';
import axios from 'axios';
import _ from 'lodash';
import watchedStateRss from './View/watcherFormRss.js';
import ru from './Text/ru.js';
import parser from './Parser/parser.js';
import validator from './Validator/validator.js';
import makeModalWindow from './Handlers/makeModalWindow.js';

const init = async () => {
  const elements = {
    form: document.querySelector('.rss-form'),
    btnAdd: document.querySelector('.h-100, btn btn-lg btn-primary px-sm-5'),
    feedback: document.querySelector('.feedback'),
    input: document.querySelector('.form-control'),
    modalButtons: document.querySelectorAll('.btn-sm'),
    titles: document.querySelectorAll('li a '),
  };

  const i18nextInstance = i18next.createInstance();
  await i18nextInstance.init({
    lng: 'ru',
    debug: true,
    resources: ru,
  });

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
      urls: [],
    },
    error: {
      errorMessage: '',
    },

    contentLoading: '',
    modal: {
      viewPosts: [],
      modalPostId: null,
    },
  };

  const getProxiUrl = (value) => {
    const newUrl = new URL('https://allorigins.hexlet.app/get?');
    newUrl.searchParams.set('url', `${value}`);
    newUrl.searchParams.set('disableCache', true);
    return newUrl.toString();
  };

  const updatePosts = (content, translater, watcher) => {
    const { urls } = content.content;
    if (urls.length === 0) return;
    const promises = urls.map((url) => {
      const newUrl = getProxiUrl(url);
      return axios
        .get(newUrl)
        .then((response) => {
          const parserData = parser(content, translater, response);
          const [, topics] = parserData;
          topics.forEach((topic) => (topic.id = _.uniqueId()));
          const oldTopics = content.content.topics.map((topic) =>
            topic.map((item) => item.title),
          );
          const flatOldTopics = _.flatten(oldTopics);
          const newTopicS = topics.filter(
            (topic) => !flatOldTopics.includes(topic.title),
          );
          if (newTopicS.length !== 0) {
            watcher.content.topics.push(newTopicS);
          }
        })

        .catch(() => {
          watcher.errorMessage = i18nextInstance.t('form.errorAxios');
        });
    });

    Promise.all(promises).finally(() =>
      setTimeout(() => updatePosts(content, translater, watcher), 5000),
    );
  };
  const watchedStateRsS = watchedStateRss(state, i18nextInstance, elements);
  setTimeout(() => updatePosts(state, i18nextInstance, watchedStateRsS), 5000);

  if (elements.titles) {
    makeModalWindow(state, watchedStateRsS);
  }

  elements.form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const { urls } = state.content;

    validator(formData.get('url'), urls, i18nextInstance)
      .then(() => {
        state.error.errorMessage = '';
        watchedStateRsS.contentLoading = 'loading';

        return getProxiUrl(formData.get('url'));
      })
      .then((newUrl) =>
        axios.get(newUrl).catch(() => {
          throw new Error(i18nextInstance.t('form.errorAxios'));
        }),
      )

      .then((response) => {
        const result = parser(response);
        const [feeds, topics] = result;
        topics.forEach((topic) => (topic.id = _.uniqueId()));

        state.content.urls.push(formData.get('url'));
        watchedStateRsS.content.feeds.push(feeds);
        watchedStateRsS.content.topics.push(topics);
        watchedStateRsS.contentLoading = 'idle';
      })

      .catch((err) => {
        watchedStateRsS.errorMessage = err.message;
        watchedStateRsS.contentLoading = 'failed';
      });
  });
};
export default init;
