import onChange from 'on-change';
import { renderRss, renderErr } from '../Render/renderRssForm.js';
//import { renderContentFeeds } from '../Render/renderContent.js';


const watchedStateRss = (state) => {
  const watcher = onChange(state, (path, value) => {
    

  })


  return watcher
}


const watchedError = (state) => {
  const watcher = onChange(state.error, (path, value) => {
    if (path === 'errorMessage') {
     
      renderErr(value)

    }
    if (path === 'errorStatus' && value === true) {
      renderRss()
      console.log("Отрисовка контента")
    }

  })
  return watcher
}

export { watchedStateRss, watchedError };

