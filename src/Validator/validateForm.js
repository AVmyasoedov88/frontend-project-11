import * as yup from 'yup';

const validateForm = (data, feeds) => {
  const schema = yup.string().url('Url is invalid').min(1, 'Form must be more 1').notOneOf(feeds);
  return schema.validate(data, feeds);
};
/*const feeds = [
  "https://rt.com/rss/news",
  'http://www.dp.ru/exportnews.xml',
  'http://www.fontanka.ru/fontanka.rss',
  'http://lenta.ru/l/r/EX/import.rss',
  
]*/

//validateForm('https://ru.hexlet.io/lessons.rss', feeds)

export default validateForm;