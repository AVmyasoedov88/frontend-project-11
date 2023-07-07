import { parser } from '../Parser/parser.js';
import validator from '../Validator/validator.js';
import { getProxiUrl } from './getProxiUrl.js';
import axios from 'axios';
import { upDate } from './update.js';
import { makeModalWindow } from '../Render/makeModalWindow.js';


const handlerRss = (state, watchedStateRsS, watchedErroR) => {
    const form = document.querySelector('.rss-form');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        validator(formData.get('url'), state)
            .then((rss) => {
                watchedStateRsS.form.value = rss; //важно!
                //watchedStateRsS.form.urls.push(rss);
                //watchedErroR.errorStatus = true;
                watchedStateRsS.form.btnAddStatus = 'send';
                
            })
  
            .then(() => {
                return getProxiUrl(state.form.value);
            })
            .then((newUrl) => {
                return axios.get(newUrl.toString())
                .catch(() => {
                    watchedErroR.errorMessage = state.i18n.form.errorAxios;
                })
                
            })
            .then((response) => {
                return parser(response);
            })
            .then(([feeds, topics]) => {
                state.form.urls.push(state.form.value);
                watchedStateRsS.content.feeds.push(feeds);
                watchedStateRsS.content.topics.push(topics);
                //watchedStateRsS.form.btnAddStatus = 'notSend';
            })
            .then(() => {
                setTimeout(() => upDate(state, watchedStateRsS), 5000);
            })

            .then(() => makeModalWindow(state))

            .catch((err) => {
                watchedErroR.errorStatus = false;
                watchedErroR.errorMessage = err.message;
               
            })
            .finally(() => {
                watchedStateRsS.form.btnAddStatus = 'notSend';
                console.log(state);
            });
    });
};
export { handlerRss };
