const makeModalWindow = (state) => {
  let modalButtons = document.querySelectorAll('.btn-sm'),
    modalHeader = document.querySelector('.modal-header'),
    modalBody = document.querySelector('.modal-body');

  modalButtons.forEach((modalButton) => {
    modalButton.addEventListener('click', (event) => {
      event.preventDefault();
      let idmodalButton = event.target.dataset.id,
        currentTopic = document.querySelector(`[data-id="${idmodalButton}"]`);
      currentTopic.classList.remove('fw-bold');
      currentTopic.classList.add('fw-normal');

      let { topics } = state.content,
        dataForModal = {};
      topics.map((topic) => {
        const temp = topic.filter((item) => item.id === idmodalButton);
        return temp.map((obj) => {
          dataForModal.title = obj.title,
          dataForModal.description = obj.description;
        });
      });

      modalHeader.textContent = dataForModal.title;
      modalBody.textContent = dataForModal.description;
    });
  });
};

export default  makeModalWindow;
