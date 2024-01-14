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
export const getClocksById = async(id) => {
    const reponse = await instance.get(`/Montres/${id}`);
    console.log(reponse.data)
    return reponse.data
}
export const getClocksByUserId = async(id) => {
  const reponse = await instance.get(`/Utilisateurs/${id}/Montres`);
  console.log(reponse.data)
  return reponse.data
}

export const delClock = async(id) => {
  await instance.delete(`/Montres/${id}/delete`);
}
export const delClockInCart = async(id) => {
  await instance.delete(`/Panier/${id}/delete`);
}
export const getClockInCart = async(userId) => {
    const response = await instance.get(`/Panier/${userId}`);
    return response.data
}
