import i18next from 'i18next';
import { setLocale } from 'yup';
import axios from 'axios';
import _ from 'lodash';
import watchedStateRss from './View/watcherFormRss.js';
import ru from './Text/ru.js';
import parser from './tools/parser.js';
import validator from './tools/validator.js';

const init = async () => {
  const elements = {
    form: document.querySelector('.rss-form'),
    btnAdd: document.querySelector('.h-100, btn btn-lg btn-primary px-sm-5'),
    feedback: document.querySelector('.feedback'),
    input: document.querySelector('.form-control'),
    posts: document.querySelector('.posts'),
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

  const updatePosts = (statE, i18nextInstancE, watchedStateRsS) => {
    const urls = statE.content.feeds.map((feed) => feed.url);

    const promises = urls.map((url) => {
      const newUrl = getProxiUrl(url);
      return axios
        .get(newUrl)
        .then((response) => {
          const parserData = parser(response);
          const [, topics] = parserData;
          topics.forEach((topic) => {
            return (topic.id = _.uniqueId());
          });
          const oldTopics = statE.content.topics.map((topic) =>
            topic.map((item) => item.title),
          );
          const flatOldTopics = _.flatten(oldTopics);
          const newTopicS = topics.filter(
            (topic) => !flatOldTopics.includes(topic.title),
          );
          if (newTopicS.length !== 0) {
            watchedStateRsS.content.topics.push(newTopicS);
          }
        })

        .catch((error) => {
          if (error.isParseError === true) {
            error.message = i18nextInstancE.t('form.errorNotRss');
          }
          if (error.message === 'Network Error') {
            error.message = i18nextInstancE.t('form.errorAxios');
          }
          watchedStateRsS.errorMessage = error.message;
        });
    });

    Promise.all(promises).finally(() =>
      setTimeout(
        () => updatePosts(state, i18nextInstance, watchedStateRsS),
        5000,
      ),
    );
  };
  const watchedStateRsS = watchedStateRss(state, i18nextInstance, elements);

  setTimeout(() => updatePosts(state, i18nextInstance, watchedStateRsS), 5000);

  elements.form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const url = formData.get('url');
    const urls = state.content.feeds.map((feed) => feed.url);
    validator(url, urls)
      .then(() => {
        state.error.errorMessage = '';
        watchedStateRsS.contentLoading = 'loading';
        const newUrl = getProxiUrl(url);
        return axios.get(newUrl);
      })
      .then((response) => {
        const result = parser(response);
        const [feeds, topics] = result;
        topics.forEach((topic) => {
          return topic.id = _.uniqueId();
        });
        feeds.url = url;
        watchedStateRsS.content.feeds.push(feeds);
        watchedStateRsS.content.topics.push(topics);
        watchedStateRsS.contentLoading = 'idle';
      })

      .catch((error) => {
        if (error.isParseError === true) {
          error.message = i18nextInstance.t('form.errorNotRss');
        }
        if (error.message === 'Network Error') {
          error.message = i18nextInstance.t('form.errorAxios');
        }
        watchedStateRsS.errorMessage = error.message;
        watchedStateRsS.contentLoading = 'failed';
      });
  });

  elements.posts.addEventListener('click', (event) => {
    if (!event.target.dataset.id) return;
    const idmodalButton = event.target.dataset.id;
    const { viewPosts } = state.modal;
    watchedStateRsS.modal.modalPostId = idmodalButton;
    if (viewPosts.includes(idmodalButton)) return;
    state.modal.viewPosts.push(idmodalButton);
  });
};
export default init;
