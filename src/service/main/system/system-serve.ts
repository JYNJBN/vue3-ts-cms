import { yhRequest } from '../../index'

export function requestPageList(
  pageName: string,
  pageOffset: number,
  pageSize: number,
  SearchInfo?: object
) {
  return yhRequest.post({
    url: `${pageName}/list`,
    data: {
      offset: pageOffset,
      size: pageSize,
      ...SearchInfo
    }
  })
}
export function requestDeletePageDate(pageName: string, id: string) {
  return yhRequest.delete({
    url: `${pageName}/${id}`
  })
}
export function requestCreatePgeDate(pageName: string, param: any) {
  return yhRequest.post({
    url: `${pageName}`,
    data: {
      ...param
    }
  })
}
export function requestUpdatePageData(pageName: string, id: string, param: object) {
  return yhRequest.patch({
    url: `${pageName}/${id}`,
    data: {
      ...param
    }
  })
}
