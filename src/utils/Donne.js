import {instance} from './axios.js'

export const getboitiers = async () => {
    const response = await instance.get('/boitiers')
    return response.data
}
export const getPierres = async () => {
    const response = await instance.get('/pierres')
    return response.data
}
export const getbracelet  = async () => {
    const response = await instance.get('/bracelet')
    return response.data
}
