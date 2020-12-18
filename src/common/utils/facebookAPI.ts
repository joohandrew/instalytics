import axios from 'axios'

export default axios.create({
    baseURL: 'https://graph.facebook.com/v9.0',
    responseType: 'json'
})