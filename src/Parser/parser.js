const parser = (state, i18nextInstance, response) => {
  const parse = new DOMParser();

  const result = parse.parseFromString(
    response.data.contents,
    'application/xml',
  );
  const parseError = result.querySelector('parsererror');
  if (parseError) {
    const error = new Error(i18nextInstance.t('form.errorNotRss'));
    console.log(error);
    error.isParseError = true;
    throw error;
  }
  // console.log(result)

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
};

export default parser;
