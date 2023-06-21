import axios from "axios";

/*const jsdom = require('jsdom');
const {JSDOM} = jsdom;

class DOMParser {
  parseFromString(s, contentType = 'text/html') {
    return new JSDOM(s, {contentType}).window.document;
  }
}*/

const rssUrl = 'https://ru.hexlet.io/lessons.rss'
const newUrl = new URL(`https://allorigins.hexlet.app/get?url=${rssUrl}`);
console.log(newUrl.toString())



const  parser = (data) => {
const parser = new DOMParser()
const result = parser.parseFromString(data.data.contents, "text/html");
return result
}


axios.get(newUrl)
.then((response) => {
  console.log(parser(response))
})