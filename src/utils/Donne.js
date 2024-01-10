import {instance} from './axios.js'

export const getboitiers = async () => {
    const response = await instance.get('/boitiers')
    return response.data
}
