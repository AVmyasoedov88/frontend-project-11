//import { watchedStateRss } from "../View/watcherFormRss.js";
import { parser } from "../Parser/parser.js";
import validator from "../Validator/validator.js";
import {  getProxiUrl } from "./getProxiUrl.js";
import axios from "axios";
import {renderContentFeeds} from '../Render/renderContent.js'

const handlerRss = (state, watchedStateRsS, watchedErroR) => {
    //console.log(state)
    const form = document.querySelector(".rss-form");

    form.addEventListener("submit", (event) => {

        event.preventDefault();
        const formData = new FormData(event.target);


        validator(formData.get("url"), state)
            .then((rss) => {
                //state.feeds.push(rss)
                watchedStateRsS.form.value = rss
                watchedStateRsS.form.urls.push(rss)
                console.log('Закончил handlerRss')
            })
            .then(() => {
                return getProxiUrl(state)
                //console.log(state)
            })
            .then((newUrl) => { return axios.get(newUrl.toString()) })
            .then((response) => { return parser(response) })
            .then(([feeds, topics]) => {
                watchedStateRsS.content.feeds.push(feeds)
                watchedStateRsS.content.topics.push(topics)
                watchedStateRsS.currentContent.currentFeed = feeds
                watchedStateRsS.currentContent.currentTopic = topics
                
                watchedErroR.errorStatus = true
                console.log('Закончил изменять state')
            })
            .then(() => {
                console.log(state)
                renderContentFeeds(state)
            })
            

            .catch((err) => {
                console.log('Сработала ошибка')
                watchedErroR.errorStatus = false
                watchedErroR.errorMessage = err.message

            })
            .finally(() => {
                console.log(state)
            })

    })

}
export { handlerRss };
