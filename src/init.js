
import { handlerRss } from "./Handlers/handlerRss.js";
import {  watchedStateRss, watchedError} from "./View/watcherFormRss.js";
import i18next from "i18next";




const init = () => {
  const promise = new Promise((resolve) => {
    const i18nextInstance = i18next.createInstance();
    i18nextInstance.init({
      lng: "ru",
      debug: true,
      resources: {
        ru: {
          translation: {
            form: {
              errorURL: "Ссылка должна быть валидным URL",
              errorDubl: "RSS уже существует"
            }
          }
        }
      }
    })
resolve(i18nextInstance)
  })
 
promise.then((i18nextInstance) => {
  const state = {
  i18n: i18nextInstance,
   form: {
    value: '',
    urls: [],
    
   },
   content: {
    feeds: [],
    topics: [],
    
  },
  currentContent: {
    currentFeed: [],
    currentTopic: [],
  },
  
   error: {
    errorStatus: null,
    errorMessage: null
   },
  };
return state
})
.then((state) => {
  const watchedStateRsS = watchedStateRss(state)
  const watchedErroR = watchedError(state)
     handlerRss(state, watchedStateRsS, watchedErroR) 
})


}
export default init;
//https://ru.hexlet.io/lessons.rss

