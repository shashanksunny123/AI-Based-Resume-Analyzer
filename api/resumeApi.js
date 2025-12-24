import client from './axiosClient'


export const uploadResume = (formData) =>
client.post('/api/v1/resume/upload', formData, {
headers: { 'Content-Type': 'multipart/form-data' },
})