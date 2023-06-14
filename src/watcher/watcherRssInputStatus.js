import onChange from 'on-change';


const watcherRssInputStatus = (state) => {
    const watcher = onChange(state, (path, validationStatus) => {
      if (validationStatus === null) return;
      //отрисовка 
      console.log("Работает watcherValidationForm ")
    });
    return watcher;
  };

export default watcherRssInputStatus;