// import { useLogin } from '@/store/login/login'
// const loginStore = useLogin()
//动态给main添加路由
import type { RouteRecordRaw } from 'vue-router'
import { breadCrumbItem } from '../base-ui/bread-crumb/yh-bread-crumb-type'

//权限路由表
const jurisdictionRoutes: any[] = []

function getJurisdictionRouteMenu(userMenu: any[]) {
  console.log(userMenu)

  //生成权限路由表
  for (const menuItem of userMenu) {
    if (menuItem.type === 1) {
      menuItem.children.forEach((element: any) => {
        const elVue = element.url.split('/').pop()
        const jurisdictionRoute: RouteRecordRaw = {
          path: `${element.url}`,
          component: () => import(`@/view${element.url}/${elVue}.vue`)
        }
        jurisdictionRoutes.push(jurisdictionRoute)
      })
    }
  }
  return jurisdictionRoutes
}
//面包屑
function getTheIdOrTheNameCorrespondingToTheCurrentPath(
  userMenu: any[],
  path: string,
  breadCrumbValue?: breadCrumbItem[]
): any {
  // console.log(userMenu, path)
  for (const menuItem of userMenu) {
    if (menuItem.type === 1) {
      if (menuItem.children) {
        const findMenu = getTheIdOrTheNameCorrespondingToTheCurrentPath(
          menuItem.children,
          path,
          breadCrumbValue
        )
        console.log(findMenu)
        if (findMenu) {
          breadCrumbValue?.push({ name: menuItem.name, path: menuItem.url })
          breadCrumbValue?.push({ name: findMenu.name, path: findMenu.url })
          return findMenu
        }
      }
    } else {
      if (menuItem.url === path) {
        return menuItem
      }
    }
  }
}
//这是为了配合计算属性使用实现面包屑的数据响应式
function pathMapBreadCrumbValue(userMenu: any[], path: string) {
  const breadCrumbValue: breadCrumbItem[] = []
  getTheIdOrTheNameCorrespondingToTheCurrentPath(userMenu, path, breadCrumbValue)
  return breadCrumbValue
}
// function getTheNameCorrespondingToTheCurrentPath(
//   userMenu: any[],
//   path: string
// ): any {
//   // console.log(userMenu, path)
//   for (const menuItem of userMenu) {
//     const breadCrumbValue = []
//     if (menuItem.type === 1) {
//       if (menuItem.children) {
//         const findMenu = getTheIdOrTheNameCorrespondingToTheCurrentPath(
//           menuItem.children,
//           path
//         )
//         console.log(findMenu)
//         if (findMenu) {
//           return findMenu
//         }
//       }
//     } else {
//       if (menuItem.url === path) {
//         return menuItem
//       }
//     }
//   }
// }

//生成权限按钮列表
function getPermissionButtonArr(userMenu: any[]) {
  const PermissionButtonArr: string[] = []
  const _recursionGetPermissionButtonArr = (userMenu: any[]) => {
    for (const userMenuItem of userMenu) {
      if (userMenuItem.type !== 3) {
        if (userMenuItem.children) {
          _recursionGetPermissionButtonArr(userMenuItem.children)
        }
      } else {
        PermissionButtonArr.push(userMenuItem.permission)
      }
    }
  }
  _recursionGetPermissionButtonArr(userMenu)
  return PermissionButtonArr
}

export {
  getJurisdictionRouteMenu,
  getTheIdOrTheNameCorrespondingToTheCurrentPath,
  pathMapBreadCrumbValue,
  getPermissionButtonArr
}
