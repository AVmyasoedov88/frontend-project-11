import * as yup from 'yup';
import { setLocale } from 'yup';
const validator = (data, state) => {
  setLocale({
    mixed: {
      default: "field_invalid"
    },
    string: {
      url: state.i18n.t('form.errorURL'),
      min: state.i18n.t('form.errorLength')
    }
  });
    const schema = yup
    .string()
    .url()
    .min(1)
    .trim()
    .notOneOf(state.form.urls, state.i18n.t('form.errorDubl'));
    return schema.validate(data, state);
  };

export default validator;
