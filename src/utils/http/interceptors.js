import { getToken } from '@/utils/token'
import { toLogin } from '@/utils/auth'
import { isNullOrUndef } from '@/utils/is'
import { isWithoutToken } from './helpers'

export function reqResolve(config) {
  // 防止緩存，給get請求加上時間戳
  if (config.method === 'get') {
    config.params = { ...config.params, t: new Date().getTime() }
  }

  // 處理不需要token的請求
  if (isWithoutToken(config)) {
    return config
  }

  const token = getToken()
  if (!token) {
    /**
     * * 未登錄或者token過期的情況下
     * * 跳轉登錄頁重新登錄，攜帶當前路由及參數，登錄成功會回到原來的頁面
     */
    toLogin()
    return Promise.reject({ code: '-1', message: '未登錄' })
  }

  /**
   * * jwt token
   * ! 認證方案: Bearer
   */
  config.headers.Authorization = config.headers.Authorization || 'Bearer ' + token

  return config
}

export function reqReject(error) {
  return Promise.reject(error)
}

export function resResolve(response) {
  return response?.data
}

export function resReject(error) {
  let { code, message } = error.response?.data || {}
  if (isNullOrUndef(code)) {
    // 未知錯誤
    code = -1
    message = '介面異常！'
  } else {
    /**
     * TODO 此處可以根據後端返回的錯誤碼自定義框架層面的錯誤處理
     */
    switch (code) {
      case 401:
        message = message || '登錄已過期'
        break
      case 403:
        message = message || '沒有權限'
        break
      case 404:
        message = message || '資源或介面不存在'
        break
      default:
        message = message || '未知異常'
        break
    }
  }
  console.error(`【${code}】 ${error}`)
  return Promise.resolve({ code, message, error })
}
