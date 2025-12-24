import client from './axiosClient'


export const getAnalysis = (payload) =>
client.post('/api/v1/analysis/score', payload)


export const getSuggestions = (payload) =>
client.post('/api/v1/suggestions/resume', payload)