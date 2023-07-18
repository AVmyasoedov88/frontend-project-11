const getProxiUrl = (value) => {
  const newUrl = new URL('https://allorigins.hexlet.app/get?');
  newUrl.searchParams.set('url', `${value}`);
  newUrl.searchParams.set('disableCache', true);
  return newUrl.toString();
};

export default getProxiUrl;
