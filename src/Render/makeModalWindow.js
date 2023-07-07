//modal
const makeModalWindow = (state) => {
    const modalButtons = document.querySelectorAll('.btn-sm');
    const modalHeader = document.querySelector('.modal-header');
    const modalBody = document.querySelector('.modal-body');

    modalButtons.forEach((modalButton) => {
        modalButton.addEventListener('click', (event) => {
            //const topicsList = document.querySelectorAll('li > a');
            event.preventDefault();
            const idmodalButton = event.target.dataset.id;
            console.log(idmodalButton);
            const currentTopic = document.querySelector(
                `[data-id="${idmodalButton}"]`
            );
            currentTopic.classList.remove('fw-bold');
            currentTopic.classList.add('fw-normal');

            const topics = state.content.topics;
            //console.log(topics)

            const x = {};
            topics.map((topic) => {
                const temp = topic.filter((item) => item.id === idmodalButton);
                return temp.map((obj) => {
                    (x.title = obj.title), (x.description = obj.description);
                });
            });

            modalHeader.textContent = x.title;
            modalBody.textContent = x.description;
            console.log(x);
            //const [titleForModal, descriptionForModal] = currentTopic
            //console.log(titleForModal)
        });
    });
};

export { makeModalWindow };
