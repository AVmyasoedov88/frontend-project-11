import { handlerRss } from "./Handlers/handlerRss.js";
import { watchedStateRss } from "./View/watcherFormRss.js";

const init = (state) => {
  

  const watchedStateRsS = watchedStateRss(state);
  

  handlerRss(state, watchedStateRsS)
    
}

export default init;
