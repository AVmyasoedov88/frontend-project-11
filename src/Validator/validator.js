import * as yup from 'yup';
import { setLocale } from 'yup';
const validator = (data, state) => {
  setLocale({
    mixed: {
      default: "field_invalid"
    },
    string: {
      url: state.i18n.t('form.errorURL'),
    }
  });
    const schema = yup
    .string()
    .url()
    .notOneOf(state.form.urls, state.i18n.t('form.errorDubl'));
    return schema.validate(data, state.form.urls);
  };

export default validator;
//добавить фиды, 