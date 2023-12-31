<script setup lang="tsx">
import SvgIcon from '../components/SvgIcon.vue'
import { ref, h, watch, inject, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { resolve } from 'pathe' // path包es代码实现
import Scrollbar from '../components/Scrollbar.vue'
import { RouterLink } from 'vue-router'
import type { Component, Slots } from 'vue'
import type { RouteMeta, RouteRecordRaw } from 'vue-router'
import { ElMenu, ElMenuItem, ElSubMenu } from 'element-plus/es'

const router = useRouter()
const route = useRoute()
const defaultActive = ref<string>(route.path) // 菜单默认选中项
const defaultOpeneds = ref<string[]>(
  router.getRoutes()
    .filter(matchedRoute => matchedRoute.children.length > 0)
    .map(matchedRoute => matchedRoute.path)
) // 子菜单默认展开项
const keepAlivePages = inject<Layout.keepAlivePages>('keepAlivePages')
const routesList = computed(() => {
  return router.options.routes
})

watch(route, (currentRoute) => {
  defaultActive.value = currentRoute.path
  // 如果该路由设置页面缓存则推进缓存组
  if (currentRoute.meta.keepAlive && !keepAlivePages?.has(currentRoute.name as string)) {
    keepAlivePages?.add(currentRoute.name as string)
  }
})

const getNavIcon = (item: RouteMeta | undefined) => {
  if (!item || (item && !item.icon)) return null
  if (typeof item.icon === 'string') {
    return <SvgIcon iconName={item.icon as string} />
  }
  return h(item?.icon as Component)
}

const MenuItemLink = (props: { route: RouteRecordRaw, url: string }, { slots }: { slots: Slots }) => {
  if (props.route.meta?.external) {
    return <a href={props.route.redirect as string} target='_blank' ref='noopener noreferrer'>{slots.default?.()}</a>
  }
  return <RouterLink to={props.url}>{slots.default?.()}</RouterLink>
}

const MenuItemNav = (props: { route: RouteRecordRaw, basePath: string }) => {
  // 子菜单模板
  const subMenuTemplate = (route: RouteRecordRaw) => {
    const slots = {
      icon: () => getNavIcon(route.meta),
      title: () => route.meta?.title
    }
    const basePath = resolve(props.basePath, route.path)
    return (
      <ElSubMenu v-slots={slots} key={basePath}>
        {route.children?.map(item => <MenuItemNav route={item} basePath={basePath}></MenuItemNav>)}
      </ElSubMenu>
    )
  }
  // 菜单项模板
  const menuItemTemplate = (route: RouteRecordRaw) => {
    const slots = {
      icon: () => getNavIcon(route.meta)
    }
    const url = resolve(props.basePath, route.path)
    return (
      <ElMenuItem key={url} v-slots={slots}>
        <MenuItemLink route={route} url={url}>
          <span>{route.meta?.title}</span>
        </MenuItemLink>
      </ElMenuItem>
    )
  }
  return props.route.meta?.hidden ? <div style="display: none"></div> :
    props.route.children ?
      props.route.children.filter((route: RouteRecordRaw) => !route.meta?.hidden).length > 1 ?
        subMenuTemplate(props.route) :
        menuItemTemplate(getOnlyChildPath(props.route)) :
      menuItemTemplate(props.route)
}

const TheSideBar = () => (
  <Scrollbar>
    <ElMenu mode="vertical" router={true} defaultActive={defaultActive.value} defaultOpeneds={defaultOpeneds.value}>
      {routesList.value.map((route, index) => <MenuItemNav key={index} route={route} basePath={route.path}></MenuItemNav>)}
    </ElMenu>
  </Scrollbar>
)

function getOnlyChildPath(parentRoute: RouteRecordRaw): RouteRecordRaw {
  const childRoute = parentRoute.children?.find((route: RouteRecordRaw) => !route.meta?.hidden)
  if (childRoute)
    childRoute.path = `${parentRoute.path}/${childRoute.path}`
  return (childRoute || {}) as RouteRecordRaw
}
</script>

<template>
  <TheSideBar />
</template>
