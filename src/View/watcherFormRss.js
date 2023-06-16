import onChange from 'on-change';

const watchedState = onChange(state.form, (path, value) => {
    console.log(state);
    if (state.form.isValid === true) {
      console.log("Можно отрисовывать");
      render(state.form.value);
      //убрать инвалид
    }
    input.classList.toggle("is-invalid");
  });

export default watchedState;