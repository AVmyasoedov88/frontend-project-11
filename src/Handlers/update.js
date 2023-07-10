import axios from 'axios';
import _ from 'lodash';
import getProxiUrl from './getProxiUrl.js';
import parser from '../Parser/parser.js';

const upDate = (state, watchedStateRsS, watchedErroR) => {
  const {urls} = state.form,
    promises = urls.map((url) => {
      const newUrl = getProxiUrl(url);
      return axios
        .get(newUrl.toString())
        .catch(() => {
          watchedErroR.errorMessage = state.i18n.t('form.errorAxios');
        })

        .then((response) => parser(response));
    });

  Promise.all(promises)
    .then((parserDatas) => {
      return parserDatas.map((parserData) => {
        const [, topics] = parserData,
          oldTopics = state.content.topics.map((topic) => {
            return topic.map((item) => item.title);
          }),
          flatOldTopics = _.flatten(oldTopics),
          newTopicS = topics.filter(
            (topic) => !flatOldTopics.includes(topic.title)
          );

        if (newTopicS.length !== 0) {
          watchedStateRsS.content.topics.push(newTopicS);
        }
      });
    })

    .then(() =>
      setTimeout(() => upDate(state, watchedStateRsS, watchedErroR), 5000)
    )

    .catch(() => {
      // watchedErroR.errorMessage = state.i18n.t('form.errorAxios');
    })
    .finally(() => {
      console.log(state);
    });
};
export default upDate;
