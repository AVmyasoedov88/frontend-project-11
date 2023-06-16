import yup from 'yup';

const validator = (data) => {
    const schema = yup.string().url();
    return schema.validate(data);
  };

export default validator;