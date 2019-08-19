import Axios from 'axios'

export const getCarouselImages = async () => {
  const res = await Axios.get('/api/images', { params: { carousel: true } })
  return res.data
}

export const getHomeImage = async () => {
  const res = await Axios.get('/api/images', { params: { home: true } })
  return res.data[0]
}

export const getBirthdayImage = async () => {
  const res = await Axios.get('/api/images', { params: { birthday: true } })
  return res.data[0]
}

export const getCollegeImage = async () => {
  const res = await Axios.get('/api/images', { params: { college: true } })
  return res.data[0]
}
