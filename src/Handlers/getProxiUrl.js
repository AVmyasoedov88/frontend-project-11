const getProxiUrl = (value) => {
  const newUrl = new URL(`https://allorigins.hexlet.app/get?url=${value}`);

  newUrl.searchParams.set("disableCache", true);
  return newUrl;
};

export { getProxiUrl };
