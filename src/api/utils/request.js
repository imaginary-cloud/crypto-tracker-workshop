import Axios from 'axios'
import { PAPRIKA_API_URL } from '../../utils/constants'

const request = async (config) => {
  const baseConf = {
    baseURL: PAPRIKA_API_URL,
    timeout: 30000,
  }
  const instance = Axios.create(baseConf)
  return instance.request(config)
}

export default class Request {
  static get(config) {
    return request({
      ...config,
      method: 'get',
    })
  }

  static post(config) {
    return request({
      ...config,
      method: 'post',
    })
  }

  static delete(config) {
    return request({
      ...config,
      method: 'delete',
    })
  }

  static put(config) {
    return request({
      ...config,
      method: 'put',
    })
  }
}
