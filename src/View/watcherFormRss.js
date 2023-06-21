import onChange from 'on-change';
import { renderRss, renderErr } from '../Render/renderRssForm.js';


const watchedStateRss = (state) => {
  const watcher = onChange(state, (path, value) => {
    //console.log(path)
    if (state.form.isValid === true) {
      renderRss(state.form.value);
    }
   else {
    //console.log(state.form.error);
    renderErr(state.form.error);
  }
    
 })
  return watcher
}

export { watchedStateRss};

