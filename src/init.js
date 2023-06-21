import { handlerRss } from "./Handlers/handlerRss.js";
import { watchedStateRss } from "./View/watcherFormRss.js";
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
     isValid: false,
     values: '',
     error: "",
     feeds: [],
   }
  };
return state
})
.then((state) => {
  const watchedStateRsS = watchedStateRss(state);
  handlerRss(state, watchedStateRsS)
})
.then(() => {
  console.log('2 step')
})
.catch(() => {
  console.log('ERROR INIT')
})
    
}

export default init;
