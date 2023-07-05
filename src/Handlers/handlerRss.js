import { parser } from '../Parser/parser.js';
import validator from '../Validator/validator.js';
import { getProxiUrl } from './getProxiUrl.js';
import axios from 'axios';
import { upDate } from './update.js';

const handlerRss = (state, watchedStateRsS, watchedErroR) => {
    const form = document.querySelector('.rss-form');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        validator(formData.get('url'), state)
            .then((rss) => {
                watchedStateRsS.form.value = rss;
                watchedStateRsS.form.urls.push(rss);
                watchedStateRsS.form.btnAddStatus = 'send';
                watchedStateRsS.form.isInputClear = true
            })
            .then(() => {
                return getProxiUrl(state.form.value);
            })
            .then((newUrl) => {
                return axios.get(newUrl.toString()).catch((error) => {
                    throw new Error(error);
                });
            })
            .then((response) => {
                return parser(response);
            })
            .then(([feeds, topics]) => {
                watchedStateRsS.content.feeds.push(feeds);
                watchedStateRsS.content.topics.push(topics);
                watchedStateRsS.form.btnAddStatus = 'notSend';
            })
            .then(() => {
                setTimeout(() => upDate(state, watchedStateRsS), 5000);
            })

            .catch((err) => {
                watchedErroR.errorStatus = false;
                watchedErroR.errorMessage = err.message;
            })
            .finally(() => {
            });
    });
};
export { handlerRss };
