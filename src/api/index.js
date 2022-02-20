import Request from './utils/request'

export const getCoin = (id) => Request.get({ url: `/tickers/${id}` })

export const getSearchCoins = (
  query = 'btc',
  param = { limit: 6, c: 'currencies' },
) => {
  const params = { ...param, q: query }
  return Request.get({ url: '/search', params })
}
