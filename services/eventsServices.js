import Axios from 'axios'

export const getEvents = async (filters = {}) => {
  const params = {
    sort: 'date',
    show: true,
    ...filters
  }
  const res = await Axios('/api/events', { params })
  return res.data
}

export const postGuest = async data => {
  const res = await Axios.post('/api/guests/invite', data)
  return res
}

export const postList = async data => {
  const res = await Axios.post('/api/lists', data)
  return res
}
