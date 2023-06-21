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
    .notOneOf(state.form.feeds, state.i18n.t('form.errorDubl'));
    return schema.validate(data, state.form.feeds);
  };

export default validator;
//добавить фиды, 