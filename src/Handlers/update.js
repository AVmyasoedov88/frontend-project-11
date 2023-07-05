import { getProxiUrl } from './getProxiUrl.js';
import axios from 'axios';
import { parser } from '../Parser/parser.js';
import _ from 'lodash';

const upDate = (state, watchedStateRsS) => {
    const urls = state.form.urls;

    const promises = urls.map((url) => {
        const newUrl = getProxiUrl(url);
        return axios
            .get(newUrl.toString())
            .catch((error) => {
                throw new Error(error.message);
            })
            .then((response) => {
                return parser(response);
            })
            .catch((error) => {
                throw new Error(error.message);
            });
    });

    Promise.all(promises)
        .then((parserDatas) => {
            parserDatas.map((parserData) => {
                const [feeds, topics] = parserData;

                const oldTopics = state.content.topics.map((topic) => {
                    return topic.map((item) => item.title);
                });

                const flatOldTopics = _.flatten(oldTopics);

                const newTopicS = topics.filter(
                    (topic) => !flatOldTopics.includes(topic.title)
                );

                if (newTopicS.length !== 0) {
                    watchedStateRsS.content.topics.push(newTopicS);
                }
                return;
            });
        })

        .then(() => setTimeout(() => upDate(state, watchedStateRsS), 5000))

        .catch((error) => {
            throw new Error(error);
        })
        .finally(() => {
            console.log(state);
        });
};
export { upDate };
