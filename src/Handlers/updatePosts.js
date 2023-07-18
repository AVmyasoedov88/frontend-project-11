/* eslint-disable */
import axios from 'axios';
import _ from 'lodash';
import getProxiUrl from './getProxiUrl.js';
import parser from '../Parser/parser.js';

const updatePosts = (state, i18nextInstance, watchedStateRsS) => {
  const { urls } = state.form;

  urls.forEach((url) => {
     const newUrl = getProxiUrl(url);
      axios
       .get(newUrl.toString())
       .then((response) => { 
         const parserData =   parser(state, i18nextInstance, response)
         const [, topics] = parserData;
        // console.log(topics)
         const oldTopics = state.content.topics.map((topic) => topic.map((item) => item.title));
         const flatOldTopics = _.flatten(oldTopics);
         console.log(flatOldTopics)
         const newTopicS = topics.filter(
           (topic) => !flatOldTopics.includes(topic.title),
         );
         
         if (newTopicS.length !== 0) {
           watchedStateRsS.content.topics.push(newTopicS);
         }
       })
       .catch(() => {
         watchedStateRsS.errorMessage = i18nextInstance.t('form.errorAxios');
       })
     })
  
  
  //.finally(() => setTimeout(() => updatePosts(state, i18nextInstance, watchedStateRsS), 5000))
 
 //console.log(promises)
 
//promises.finally(() => setTimeout(() => updatePosts(state, i18nextInstance, watchedStateRsS), 5000))
 // Promise.all(promises)
    /*.then((parserDatas) => parserDatas.map(parserData => {
      const [, topics] = parserData;
      topics.forEach((topic) => (topic.id = _.uniqueId()));
      const oldTopics = state.content.topics.map((topic) => topic.map((item) => item.title));
      const flatOldTopics = _.flatten(oldTopics);
      const newTopicS = topics.filter(
        (topic) => !flatOldTopics.includes(topic.title),
      );
      if (newTopicS.length !== 0) {
        watchedStateRsS.content.topics.push(newTopicS);
      }
    }))*/
   // .finally(() => setTimeout(() => updatePosts(state, i18nextInstance, watchedStateRsS), 5000))
    //.finally(() => console.log(state))
};
export default updatePosts;
