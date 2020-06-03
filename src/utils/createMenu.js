// 创建左边siderbar 当前角色可访问的菜单
export function createMenuItem(route, roles) {
  // 含有Children属性
  const createOutPath = (routes, roles) => {
    return routes.filter(route => {
      return createChildrenPath(route, roles)
    })
  }

  // 无children属性
  const createChildrenPath = (route, roles) => {
    if (route.hidden) return false
    if (route.redirect) return false
    if (!route.meta || !route.meta.roles) {
      return [route]
    }
    if (route.meta.roles && route.meta.roles === roles) {
      return [route]
    }
    return false
  }

  if (route.children) {
    return createOutPath(route.children, roles)
  }
  return createChildrenPath(route, roles)
}
