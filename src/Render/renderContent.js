
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

    h3.innerHTML = feeds[feeds.length - 1].title;
    p.innerHTML = feeds[feeds.length - 1].description;
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
                'border-end-0'
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
            a.innerHTML = item.title;
            button.innerHTML = 'Просмотр';
            li.append(a, button);
            ulTopics.prepend(li);
        });
    });
};

const renderContentFeeds = () => {
    const feedsContaner = document.querySelector('.feeds');
    const postsContaner = document.querySelector('.posts');
    if (feedsContaner.textContent === '') {
        renderContentTitle(feedsContaner);
        renderContentTitle(postsContaner);
        const titleFeed = document.querySelector('.feeds h2');
        const titlePost = document.querySelector('.posts h2');
        titleFeed.innerHTML = 'Фиды';
        titlePost.innerHTML = 'Посты';
    }
};

export { renderContentFeeds, renderFeeds, renderTopics };
