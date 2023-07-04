
const getProxiUrl = (value) => {
   
    //const rssUrl = value
    //console.log(state.form.value)
    //try {
    const newUrl = new URL(`https://allorigins.hexlet.app/get?url=${value}`);
    //console.log(newUrl.toString())
    newUrl.searchParams.set('disableCache', true);
    return newUrl
}





export {  getProxiUrl };