const clickButton = (state, watchedStateRsS) => {
  const modalButtons = document.querySelectorAll('.btn-sm');
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
};

const clickTitle = (state, watchedStateRsS) => {
  const titles = document.querySelectorAll('li a');

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

export { clickButton, clickTitle };
