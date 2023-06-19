import onChange from 'on-change';
import { renderRss, renderErr } from '../Render/renderRssForm.js';


const watchedStateRss = (state) => {
  const watcher = onChange(state.form, (path, value) => {
    if (state.form.isValid === true) {
      renderRss();
    } else {
      renderErr(state);
    }
  })
  return watcher
}

export { watchedStateRss};

