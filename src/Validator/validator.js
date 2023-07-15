import * as yup from 'yup';

const validator = (data, state, i18nextInstance) => {
  const schema = yup
    .string()
    .url()
    .min(1)
    .trim()
    .notOneOf(state.form.urls, i18nextInstance.t('form.errorDubl'));
  return schema.validate(data, i18nextInstance);
};

export default validator;
