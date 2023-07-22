import * as yup from 'yup';

const validator = (data, urls) => {
  const schema = yup
    .string()
    .url()
    .min(1)
    .trim()
    .notOneOf(urls);
  return schema.validate(data);
};

export default validator;
