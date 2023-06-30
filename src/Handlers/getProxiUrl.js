
const getProxiUrl = (state) => {
   
    const rssUrl = state.form.value
    //console.log(state.form.value)
    //try {
    const newUrl = new URL(`https://allorigins.hexlet.app/get?url=${rssUrl}`);
    //console.log(newUrl.toString())
    newUrl.searchParams.set('disableCache', true);
    return newUrl
}





export {  getProxiUrl };