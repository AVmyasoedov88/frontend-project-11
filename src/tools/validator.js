import * as yup from 'yup';

const validator = (data, urls, i18nextInstance) => {
  const schema = yup
    .string()
    .url()
    .min(1)
    .trim()
    .notOneOf(urls, i18nextInstance.t('form.errorDubl'));
  return schema.validate(data, i18nextInstance);
};

export default validator;
