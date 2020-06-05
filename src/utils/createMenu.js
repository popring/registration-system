// 创建左边siderbar 当前角色可访问的菜单
export function createMenuItem(route, role) {
  // 含有Children属性
  const createOutPath = (routes, role) => {
    return routes.filter(route => {
      return createChildrenPath(route, role)
    })
  }

  // 无children属性
  const createChildrenPath = (route, role) => {
    if (route.hidden) return false
    if (route.redirect) return false
    if (!route.meta || !route.meta.role) {
      return [route]
    }
    if (route.meta.role && route.meta.role === role) {
      return [route]
    }
    return false
  }

  if (route.children) {
    return createOutPath(route.children, role)
  }
  return createChildrenPath(route, role)
}
