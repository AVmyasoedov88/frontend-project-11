import { getProxiUrl } from "./getProxiUrl.js"
import axios from "axios"
import { parser } from "../Parser/parser.js"

const upDate = (state, watchedStateRsS) => {
    const urls = state.form.urls

    const promises = urls.map((url) => {
        const newUrl = getProxiUrl(url)
        return axios.get(newUrl.toString())
            .catch((error) => { throw new Error(error) })
            .then((response) => { return parser(response) })
    })
    Promise.all(promises)
        .then((parserData) => {
            parserData.forEach((content) => {
                const [feeds, topics] = content
                const oldTitles = []
                const oldTopics = state.content.topics
               // console.log(oldTopics)
                oldTopics.forEach((item) => {
                    //console.log(item)
                    item.filter((element) => oldTitles.push(element.title))

                    const newTopics = topics.filter((item) => {
                        if (!oldTitles.includes(item.title)) {
                            return item
                        }
                    })

                    if (newTopics.length === 0) {
                        return
                    }
                    newTopics.forEach((newTopic) => watchedStateRsS.content.topics.push(newTopic))
                })
            })
        })
        .then(() => setTimeout(() => upDate(state), 5000))
        .catch((error) => {
            throw new Error(error)
        })

}
export { upDate }