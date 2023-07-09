/* eslint-disable max-len, one-var */
const makeModalWindow = (state) => {
    const modalButtons = document.querySelectorAll('.btn-sm'),
        modalHeader = document.querySelector('.modal-header'),
        modalBody = document.querySelector('.modal-body');

    modalButtons.forEach((modalButton) => {
        modalButton.addEventListener('click', (event) => {
            event.preventDefault();
            const idmodalButton = event.target.dataset.id,
                currentTopic = document.querySelector(`[data-id="${idmodalButton}"]`);
            currentTopic.classList.remove('fw-bold');
            currentTopic.classList.add('fw-normal');

            const { topics } = state.content,

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

export { makeModalWindow };
