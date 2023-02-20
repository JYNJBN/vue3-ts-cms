import { yhRequest } from '..'
import { accountFormObj } from '@/store/login/login_type'

enum requestLoginUrl {
  loginUrl = '/login',
  userInfoUrl = '/users/', //例子 /users/id
  userMenu = '/role/' // /role/id/menu
}

export function accountLoginRequest(loginInfo: accountFormObj) {
  return yhRequest.post({
    url: requestLoginUrl.loginUrl,
    data: loginInfo
  })
}
export function requestUserInfo(id: number) {
  return yhRequest.get({
    url: requestLoginUrl.userInfoUrl + id
  })
}
export function requestUserMenu(id: number) {
  return yhRequest.get({
    url: requestLoginUrl.userMenu + id + '/menu'
  })
}
