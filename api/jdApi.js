import client from './axiosClient'


export const uploadJDText = (payload) =>
client.post('/api/v1/jd/text', payload)