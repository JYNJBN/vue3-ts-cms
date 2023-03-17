import { useLogin } from '../store/login/login'
const loginStore = useLogin()

//根据传进来的数据去查询权限表
export function usePermissions(pageName: string, permissionName: string) {
  const verifyPermission = `system:${pageName}:${permissionName}`
  console.log(loginStore.PermissionButtonArr)
  console.log(verifyPermission)
  return !!loginStore.PermissionButtonArr.find((element: string) => element === verifyPermission)
}
