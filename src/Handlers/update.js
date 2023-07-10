import axios from 'axios';
import _ from 'lodash';
import getProxiUrl from './getProxiUrl.js';
import parser from '../Parser/parser.js';

const upDate = (state, watchedStateRsS, watchedErroR) => {
  const { urls } = state.form;
  const promises = urls.map((url) => {
    const newUrl = getProxiUrl(url);
    return axios
      .get(newUrl.toString())
      .catch(() => {
        watchedErroR.errorMessage = state.i18n.t('form.errorAxios');
      })
      .then((response) => parser(response));
  });

  Promise.all(promises)
    .then((parserDatas) => parserDatas.map((parserData) => {
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
    .then(() =>
      setTimeout(() => upDate(state, watchedStateRsS, watchedErroR), 5000));
};
export default upDate;
