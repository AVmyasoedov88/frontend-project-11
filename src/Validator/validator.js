import * as yup from 'yup';

const validator = (data, feeds) => {
    const schema = yup.string().url().notOneOf(feeds);
    return schema.validate(data);
  };

export default validator;
//добавить фиды, 