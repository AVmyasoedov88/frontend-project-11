const makeModalWindow = (state, watchedStateRsS) => {
  const modalButtons = document.querySelectorAll('.btn-sm');
  const titles = document.querySelectorAll('li a');

  modalButtons.forEach((modalButton) => {
    modalButton.addEventListener('click', (event) => {
      event.preventDefault();
      const idmodalButton = event.target.dataset.id;
      const { viewPosts } = state.modal;

      if (viewPosts.includes(idmodalButton)) return;
      state.modal.viewPosts.push(idmodalButton);
      watchedStateRsS.modal.modalPostId = idmodalButton;
    });
  });

  titles.forEach((title) => {
    title.addEventListener('click', (event) => {
      const idmodalButton = event.target.dataset.id;
      const { viewPosts } = state.modal;

      if (viewPosts.includes(idmodalButton)) return;
      state.modal.viewPosts.push(idmodalButton);
      watchedStateRsS.modal.modalPostId = idmodalButton;
    });
  });
};

export default makeModalWindow;
