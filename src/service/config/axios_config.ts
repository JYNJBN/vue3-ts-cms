let BASE_URL = ''
const TIME_OUT = 5000
if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'http://123.207.32.32:5000'
} else if (process.env.NODE_ENV === 'development') {
  BASE_URL = '/api'
} else {
  BASE_URL = 'http://123.207.32.32:5000'
}
export { BASE_URL, TIME_OUT }
