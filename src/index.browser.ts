import { nanohash } from './index'

declare global {
  interface Window {
    nanohash: any
  }
  interface global {
    nanohash: any
  }
}

window.nanohash = nanohash
