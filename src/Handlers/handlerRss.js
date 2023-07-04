//import { watchedStateRss } from "../View/watcherFormRss.js";
import { parser } from "../Parser/parser.js";
import validator from "../Validator/validator.js";
import {  getProxiUrl } from "./getProxiUrl.js";
import axios from "axios";
//import {getRssData} from '../Render/renderContent.js'
import { upDate } from "./update.js";

const handlerRss = (state, watchedStateRsS, watchedErroR) => {
    //console.log(state)
    const form = document.querySelector(".rss-form");

    form.addEventListener("submit", (event) => {

        event.preventDefault();
        const formData = new FormData(event.target);
        const nameHost = new URL(formData.get("url")).hostname

        validator(formData.get("url"), state)
            .then((rss) => {
                //state.feeds.push(rss)
                watchedStateRsS.form.value = rss
                watchedStateRsS.form.urls.push(rss)
                console.log('Закончил handlerRss')
            })
            .then(() => {
                return getProxiUrl(state.form.value)
                //console.log(state)
            })
            .then((newUrl) => { 
                return axios.get(newUrl.toString())
                .catch((error) => {throw new Error (error)}) 
            
            })
            .then((response) => { return parser(response, nameHost) })
            .then(([feeds, topics]) => {
                watchedStateRsS.content.feeds.push(feeds)
                watchedStateRsS.content.topics.push(topics)
                               
                watchedErroR.errorStatus = true //?????
                console.log('Закончил изменять state')
            }) 
            .then(() => {
                setTimeout(() => upDate(state, watchedStateRsS), 5000)
            })        

            .catch((err) => {
                console.log('Сработала ошибка')
                watchedErroR.errorStatus = false
               // watchedStateRsS.form.value = ''
                watchedErroR.errorMessage = err.message

            })
            .finally(() => {
                console.log(state)
            })

    })

}
export { handlerRss };
