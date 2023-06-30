import _ from 'lodash';

const  parser = (response) => {
 try {

   const parser = new DOMParser()
   
   const result = parser.parseFromString(response.data.contents, 'application/xml');
   
   const id = _.uniqueId()
   const feeds = { 
     title: result.querySelector('channel title').textContent,
     description: result.querySelector('channel description').textContent,
     uniqueIdFeed: id
   }
   //console.log(feeds)
   const items = Array.from(result.querySelectorAll('item'))
   //console.log(items[0].querySelector('link').textContent)
   
   //console.log(items)
   const topics = items.map((item) => {
     return {
       title: item.querySelector('title').textContent,
       link: item.querySelector('link').textContent,
       description: item.querySelector('description').textContent,
       uniqueIdTopic: id,
     }
     
   })
   return [feeds, topics]
 }
 catch (error) {
  throw new Error('RSS FUCK!')
 }
   

  
}



export {parser};
