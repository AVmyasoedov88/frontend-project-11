/* eslint-disable */
import axios from 'axios';
import _ from 'lodash';
import getProxiUrl from './getProxiUrl.js';
import parser from '../Parser/parser.js';

const upDate = (state, i18nextInstance, watchedStateRsS, id) => {
  const { urls } = state.form;
  const promises = urls.map((url) => {
    const newUrl = getProxiUrl(url);
    return axios
      .get(newUrl.toString())
      .catch(() => {
        watchedStateRsS.errorMessage = i18nextInstance.t('form.errorAxios');
      })
      .then((response) => parser(state, i18nextInstance, response, id));
  });

  Promise.all(promises)
    .then((parserDatas) => parserDatas.map(parserData => {
      const [, topics] = parserData;
      const oldTopics = state.content.topics.map((topic) => topic.map((item) => item.title));
      const flatOldTopics = _.flatten(oldTopics);
      const newTopicS = topics.filter(
        (topic) => !flatOldTopics.includes(topic.title),
      );
      if (newTopicS.length !== 0) {
        watchedStateRsS.content.topics.push(newTopicS);
      }
    }))
    .then(() => setTimeout(() => upDate(state, i18nextInstance, watchedStateRsS, id), 5000))
    .finally(() => console.log(state))
};
export default upDate;
