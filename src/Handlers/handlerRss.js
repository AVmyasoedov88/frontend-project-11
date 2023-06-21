//import { watchedStateRsS, watchedStateFeeds } from "../View/watcherFormRss.js";
import validator from "../Validator/validator.js";

const handlerRss = (state, watchedStateRsS) => {
    //console.log(state)
    const form = document.querySelector(".rss-form");
   
    form.addEventListener("submit", (event) => {
        
        event.preventDefault();
        const formData = new FormData(event.target);
        console.log(formData.get("url"))
       
        validator(formData.get("url"), state)
        .then((rss) => {
            //state.feeds.push(rss)
            watchedStateRsS.form.value = rss
            watchedStateRsS.form.feeds.push(rss)
            watchedStateRsS.form.isValid = true;
           
        })
        .catch((err) => {
            console.log(err)
            watchedStateRsS.form.isValid = false;
            watchedStateRsS.form.error = err.errors;
               
            })
        .finally(() => {
            console.log(state)
            })

    });
}
export { handlerRss };