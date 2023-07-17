const parser = (state, i18nextInstance, response) => {
  try {
    const parse = new DOMParser();

    const result = parse.parseFromString(
      response.data.contents,
      'application/xml',
    );

    const feeds = {
      title: result.querySelector('channel title').textContent,
      description: result.querySelector('channel description').textContent,
    };

    const items = Array.from(result.querySelectorAll('item'));

    const topics = items.map((item) => ({
      title: item.querySelector('title').textContent,
      link: item.querySelector('link').textContent,
      description: item.querySelector('description').textContent,
    }));

    return [feeds, topics];
  } catch (error) {
    throw new Error(i18nextInstance.t('form.errorNotRss'));
  }
};

export default parser;
