import onChange from 'on-change';
import { renderRss, renderErr } from '../Render/renderRssForm.js';
import {
  renderContentFeeds,
  renderFeeds,
  renderTopics,
} from '../Render/renderContent.js';

const input = document.querySelector('.form-control');
const watchedStateRss = (state) => {
  const watcher = onChange(state, (path, value) => {
      if (path === 'form.value') {
        renderRss();
      }

      if (path === 'content.feeds') {
        renderContentFeeds();
        renderFeeds(value);
      }
      if (path === 'content.topics') {
        renderTopics(value);
      }

      if (path === 'form.btnAddStatus') {
        const btn = document.querySelector(
          '.h-100, btn btn-lg btn-primary px-sm-5',
        );
        // console.log(btn)
        if (value === 'send') {
          btn.disabled = true;
        } else {
          btn.disabled = false;
        }
      }

      if (path === 'form.isInputClear') {
        if (value) {
          input.value = '';
        }
      }
    });

    return watcher;
  },
  watchedError = (state) => {
    const watcher = onChange(state.error, (path, value) => {
      if (path === 'errorMessage') {
        renderErr(value);
      }
    });
    return watcher;
  };

export { watchedStateRss, watchedError };
