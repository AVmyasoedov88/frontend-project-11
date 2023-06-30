
const handler = (state) => {
    console.log('HI')
   
        const form = document.querySelector(".rss-form");

        form.addEventListener("submit", (event) => {

            event.preventDefault();
            const formData = new FormData(event.target);
           state.form.urlInput =  formData.get("url")
           
        })
        
       



}




/*validator(formData.get("url"), state)
    .then((rss) => {
        //state.feeds.push(rss)
        watchedStateRsS.form.value = rss
        watchedStateRsS.form.urls.push(rss)
        console.log('Закончил handlerRss')
    })
    .then(() => {
      return  handlerUrl(state, watchedStateRsS)
    })
    
    .catch((err) => {
        
        watchedStateRsS.error.errorMessage = err.message

    })
    .finally(() => {
        console.log(state)
    })*/








export { handler }