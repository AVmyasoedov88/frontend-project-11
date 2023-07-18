import onChange from 'on-change';

const renderRss = (i18nextInstance, elements) => {
  const { feedback, input } = elements;
  feedback.classList.remove('text-danger');
  input.classList.remove('is-invalid');
  feedback.classList.add('text-success');
  feedback.textContent = i18nextInstance.t('form.succsessRss');
  input.value = '';
  input.focus();
};

const renderErr = (err, elements) => {
  const { feedback, input } = elements;
  feedback.classList.remove('text-success');
  feedback.classList.add('text-danger');
  input.classList.add('is-invalid');
  feedback.textContent = `${err}`;
};

const renderContentTitle = (nameTitle) => {
  const divCardBorder = document.createElement('div');
  const cardBody = document.createElement('div');
  const h2Title = document.createElement('h2');
  const ul = document.createElement('ul');
  divCardBorder.classList.add('card', 'border-0');
  cardBody.classList.add('card-body');
  h2Title.classList.add('card-title', 'h4');
  ul.classList.add('list-group', 'border-0', 'rounded-0');
  divCardBorder.append(cardBody, ul);
  cardBody.append(h2Title);
  nameTitle.append(divCardBorder);
};

const renderFeeds = (feeds) => {
  const ulFeed = document.querySelector('.feeds ul');
  const li = document.createElement('li');
  const h3 = document.createElement('h3');
  const p = document.createElement('p');
  li.classList.add('list-group-item', 'border-0', 'border-end-0');
  h3.classList.add('h6', 'm-0');
  p.classList.add('m-0', 'small', 'text-black-50');

  h3.textContent = feeds[feeds.length - 1].title;
  p.textContent = feeds[feeds.length - 1].description;
  li.append(h3, p);
  ulFeed.prepend(li);
};

const renderTopics = (topics) => {
  const ulTopics = document.querySelector('.posts ul');

  topics.forEach((element) => {
    element.forEach((item) => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      const button = document.createElement('button');
      li.classList.add(
        'list-group-item',
        'd-flex',
        'justify-content-between',
        'align-items-start',
        'border-0',
        'border-end-0',
      );

      a.classList.add('fw-bold');
      a.dataset.id = item.id;
      a.setAttribute('target', '_blank');
      a.setAttribute('rel', 'noopener noreferrer');
      button.classList.add('btn', 'btn-outline-primary', 'btn-sm');
      button.setAttribute('type', 'button');
      button.dataset.id = item.id;
      button.dataset.bsToggle = 'modal';
      button.dataset.bsTarget = '#modal';
      a.setAttribute('href', item.link);
      a.textContent = item.title;
      button.textContent = 'Просмотр';
      li.append(a, button);
      ulTopics.prepend(li);
    });
  });
};

const renderContentFeeds = (i18nextInstance) => {
  const feedsContaner = document.querySelector('.feeds');
  const postsContaner = document.querySelector('.posts');
  if (feedsContaner.textContent === '') {
    renderContentTitle(feedsContaner);
    renderContentTitle(postsContaner);
    const titleFeed = document.querySelector('.feeds h2');
    const titlePost = document.querySelector('.posts h2');
    titleFeed.textContent = i18nextInstance.t('text.feeds');
    titlePost.textContent = i18nextInstance.t('text.posts');
  }
};

const renderModal = (state) => {
  const modalHeader = document.querySelector('.modal-header');
  const modalBody = document.querySelector('.modal-body');
  const modalReadFull = document.querySelector('.modal-footer a');
  const { modalPostId } = state.modal;
  const { topics } = state.content;
  const currentTopic = document.querySelector(`[data-id="${modalPostId}"]`);
  currentTopic.classList.remove('fw-bold');
  currentTopic.classList.add('fw-normal');
  const dataForModal = {};
  topics.map((topic) => {
    const temp = topic.filter((item) => item.id === modalPostId);
    return temp.map((obj) => {
      dataForModal.title = obj.title;
      dataForModal.description = obj.description;
      dataForModal.link = obj.link;
    });
  });

  if (dataForModal.description.match(/<h1>/)) {
    modalBody.innerHTML = dataForModal.description;  // решил так, как на сайте https://buzzfeed.com/world.xml description c тегами
  } else {
    modalBody.textContent = dataForModal.description;
  }

  modalHeader.textContent = dataForModal.title;
  modalReadFull.href = dataForModal.link;
};
export default function watchedStateRss(state, i18nextInstance, elements) {
  const watcher = onChange(state, (path, value) => {
    switch (path) {
      case 'form.statusRss':
        renderRss(i18nextInstance, elements);
        break;

      case 'content.feeds':
        renderContentFeeds(i18nextInstance);
        renderFeeds(value);
        break;

      case 'content.topics':
        renderTopics(value);
        break;

      case 'form.btnAddStatus':
        if (value === 'send') {
          elements.btnAdd.disabled = true;
        } else {
          elements.btnAdd.disabled = false;
        }
        break;

      case 'form.isInputClear' && value:
        elements.input.value = '';
        break;

      case 'errorMessage':
        renderErr(value, elements);
        break;

      case 'modal.modalPostId':
        renderModal(state);
        break;

      default:
        console.log('Что-то случилось');
        break;
    }
  });

  return watcher;
}
