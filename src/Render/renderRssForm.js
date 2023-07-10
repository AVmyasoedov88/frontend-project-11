const feedback = document.querySelector('.feedback');
const input = document.querySelector('.form-control');

const renderRss = () => {
  feedback.classList.remove('text-danger');
  input.classList.remove('is-invalid');
  feedback.classList.add('text-success');
  feedback.innerHTML = 'RSS успешно загружен';
  input.value = '';
  input.focus();
};

const renderErr = (err) => {
  feedback.classList.remove('text-success');
  feedback.classList.add('text-danger');
  input.classList.add('is-invalid');
  feedback.innerHTML = `${err}`;
};

export { renderRss, renderErr };
