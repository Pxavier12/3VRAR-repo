import axios from 'axios'

const api = axios.create({
    baseURL: 'https://api.spacex.land/rest',
})

export const getLatestLaunch = payload => api.get(`/launch-latest`, payload)
export const getNextLaunch = payload => api.get(`/launch-next`, payload)
export const getLaunchById = (id,payload) =>api.get(`/launch/${id}`,payload)



const spaceApi = {
    getLatestLaunch,
    getNextLaunch,
    getLaunchById,

    
}

export default spaceApi