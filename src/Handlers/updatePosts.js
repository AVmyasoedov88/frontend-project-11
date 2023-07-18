/* eslint-disable */
import axios from 'axios';
import _ from 'lodash';
import getProxiUrl from './getProxiUrl.js';
import parser from '../Parser/parser.js';

const updatePosts = (state, i18nextInstance, watchedStateRsS) => {
  const { urls } = state.form;
  const promises = urls.map((url) => {
    const newUrl = getProxiUrl(url);
    return axios
      .get(newUrl.toString())
      .then((response) => parser(state, i18nextInstance, response))
      .catch(() => {
        watchedStateRsS.errorMessage = i18nextInstance.t('form.errorAxios');
      });
  });

  Promise.all(promises)
    .then((parserDatas) =>
      parserDatas.map((parserData) => {
        const [, topics] = parserData;
        topics.forEach((topic) => (topic.id = _.uniqueId()));
        const oldTopics = state.content.topics.map((topic) =>
          topic.map((item) => item.title),
        );
        const flatOldTopics = _.flatten(oldTopics);
        const newTopicS = topics.filter(
          (topic) => !flatOldTopics.includes(topic.title),
        );
        if (newTopicS.length !== 0) {
          watchedStateRsS.content.topics.push(newTopicS);
        }
      }),
    )
    .finally(() =>
      setTimeout(
        () => updatePosts(state, i18nextInstance, watchedStateRsS),
        5000,
      ),
    );
};
export default updatePosts;
