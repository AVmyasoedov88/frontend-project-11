/* eslint-disable implicit-arrow-linebreak */
import i18next from 'i18next';
import { setLocale } from 'yup';
import axios from 'axios';
import _ from 'lodash';
import watchedStateRss from './View/watcher.js';
import ru from './Text/ru.js';
import parsing from './tools/parsing.js';
import validator from './tools/validator.js';

const init = async () => {
  const elements = {
    form: document.querySelector('.rss-form'),
    btnAdd: document.querySelector('.h-100, btn btn-lg btn-primary px-sm-5'),
    feedback: document.querySelector('.feedback'),
    input: document.querySelector('.form-control'),
    posts: document.querySelector('.posts'),
    feedsContaner: document.querySelector('.feeds'),
    postsContaner: document.querySelector('.posts'),
    modalHeader: document.querySelector('.modal-header'),
    modalBody: document.querySelector('.modal-body'),
    modalReadFull: document.querySelector('.modal-footer a'),
  };

  const i18nextInstance = i18next.createInstance();
  await i18nextInstance.init({
    lng: 'ru',
    debug: true,
    resources: ru,
  });

  setLocale({
    mixed: {
      notOneOf: i18nextInstance.t('form.errorDubl'),
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
      errorMessage: '',
    },

    feedsLoading: 'idle',
    UIState: {
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

  const updatePosts = (statE, i18nextInstancE, watchedStateRsS) => {
    const urls = statE.content.feeds.map((feed) => feed.url);
    const oldTopics = _.flatten(statE.content.topics).map((item) => item.title);

    const promises = urls.map((url) => {
      const newUrl = getProxiUrl(url);
      return axios
        .get(newUrl)
        .then((response) => {
          const parserData = parsing(response);
          const { topic } = parserData;
          topic.forEach((item) => {
            item.id = _.uniqueId();
          });

          const newTopicS = topic.filter(
            (item) => !oldTopics.includes(item.title),
          );
          if (newTopicS.length !== 0) {
            watchedStateRsS.content.topics.push(newTopicS);
          }
        });
    });

    Promise.all(promises).finally(() =>
      setTimeout(
        () => updatePosts(state, i18nextInstance, watchedStateRsS),
        5000,
      ));
  };
  const watchedStateRsS = watchedStateRss(state, i18nextInstance, elements);

  function typeError(error) {
    if (error.isParseError === true) {
      return i18nextInstance.t('form.errorNotRss');
    }
    if (error.message === 'Network Error') {
      return i18nextInstance.t('form.errorAxios');
    }

    return error.message;
  }
  setTimeout(() => updatePosts(state, i18nextInstance, watchedStateRsS), 5000);

  elements.form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const url = formData.get('url');
    const urls = state.content.feeds.map((feed) => feed.url);

    watchedStateRsS.feedsLoading = 'loading';
    validator(url, urls)
      .then(() => {
        state.form.errorMessage = '';
        const newUrl = getProxiUrl(url);
        return axios.get(newUrl);
      })
      .then((response) => {
        const result = parsing(response);
        const { feed, topic } = result;
        feed.url = url;
        topic.forEach((item) => {
          item.id = _.uniqueId();
        });

        watchedStateRsS.content.feeds.push(feed);
        watchedStateRsS.content.topics.push(topic);
        watchedStateRsS.feedsLoading = 'idle';
      })

      .catch((error) => {
        watchedStateRsS.errorMessage = typeError(error);
        watchedStateRsS.feedsLoading = 'failed';
      });
  });

  elements.posts.addEventListener('click', (event) => {
    if (!event.target.dataset.id) return;
    const idmodalButton = event.target.dataset.id;
    const { viewPosts } = state.UIState;
    watchedStateRsS.UIState.modalPostId = idmodalButton;
    if (viewPosts.includes(idmodalButton)) return;
    state.UIState.viewPosts.push(idmodalButton);
  });
};
export default init;
