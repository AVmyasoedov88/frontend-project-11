const parsing = (response) => {
  const parse = new DOMParser();

  const result = parse.parseFromString(
    response.data.contents,
    'application/xml',
  );

  const parseError = result.querySelector('parsererror');
  if (parseError) {
    const error = new Error(parseError.textContent);
    error.isParseError = true;
    throw error;
  }

  const feed = {
    title: result.querySelector('channel title').textContent,
    description: result.querySelector('channel description').textContent,
  };

  const items = Array.from(result.querySelectorAll('item'));

  const topics = items.map((item) => ({
    title: item.querySelector('title').textContent,
    link: item.querySelector('link').textContent,
    description: item.querySelector('description').textContent,
  }));

  return { feed, topics };
};

export default parsing;
