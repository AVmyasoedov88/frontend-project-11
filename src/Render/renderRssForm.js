const feedback = document.querySelector(".feedback")
const input = document.querySelector(".form-control");

const renderRss = () => {
  feedback.classList.remove('text-danger')
  input.classList.remove('is-invalid')
  feedback.classList.add("text-success")
  feedback.innerHTML = 'RSS успешно загружен';
};

const renderErr = (state) => {
  //console.log(err)
  feedback.classList.remove('text-success')
  feedback.classList.add('text-danger')
  input.classList.add('is-invalid')
  let error = ''
  if (state.form.errorType === 'url') {
    error = 'Ссылка должна быть валидным URL'
  }
  if (state.form.errorType === 'notOneOf') {
    error = 'RSS уже существует'
  }
 
  feedback.innerHTML = `${error}`;
};



export { renderRss, renderErr }