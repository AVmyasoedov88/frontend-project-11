import _ from 'lodash';

const parser = (response) => {
  try {
    const parser = new DOMParser();

    const result = parser.parseFromString(
      response.data.contents,
      'application/xml'
    );

    const id = _.uniqueId();
    const feeds = {
      title: result.querySelector('channel title').textContent,
      description: result.querySelector('channel description')
        .textContent,
      id,
    };

    const items = Array.from(result.querySelectorAll('item'));

    const topics = items.map((item) => {
      return {
        title: item.querySelector('title').textContent,
        link: item.querySelector('link').textContent,
        description: item.querySelector('description').textContent,
        id,
      };
    });

    return [feeds, topics];
  } catch (error) {
    throw new Error('Ресурс не содержит валидный RSS');
  }
};

export { parser };
