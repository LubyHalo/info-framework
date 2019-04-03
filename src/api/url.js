import axios from './api'

export const login = (params) => axios.post('/admin/login', params)
