import axios from "axios";
import { getProxiUrl } from "../Handlers/getProxiUrl.js";
import { parser } from "./parser.js";


const parsing = (state, watchedErroR) => {
    const newUrl = getProxiUrl(state.form.value);
        return axios.get(newUrl.toString())
            .then((response) => {
                 parser(response);
            })
            .catch((err) => {
                watchedErroR.errorStatus = false;
                watchedErroR.errorMessage = 'Ресурс не содержит валидный RSS';
            });
}

export {parsing}