//import { watchedStateRsS, watchedStateFeeds } from "../View/watcherFormRss.js";
import validator from "../Validator/validator.js";

const handlerRss = (state, watchedStateRsS) => {
    const form = document.querySelector(".rss-form");
    const input = document.querySelector(".form-control");
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        console.log(formData.get("url"))
       

        validator(formData.get("url"), state.feeds)
        .then((rss) => {
            state.feeds.push(rss)
            watchedStateRsS.value = rss
            watchedStateRsS.isValid = true;
        })
        .catch((err) => {
            console.log(err.type)
            watchedStateRsS.isValid = false;
            watchedStateRsS.errorType = err.type;
               
            })
        .finally(() => {

            console.log(state)
            })

        input.value = ''


    });
}
export { handlerRss };