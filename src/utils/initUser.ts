import { RouteRecordRaw, Router } from 'vue-router'
import { _routes_ } from '@/router'
import currRoutes from '@/stores/currRoutes'
//import dirs from '../presets/dirs'
import Layout from '@/layout/index.vue'
import {
  UserFilled,
  Setting,
  Notebook,
 // User,
  List,
  Search,
  HomeFilled,
} from '@element-plus/icons-vue'
import { Component } from 'vue'

//import { userStore } from '@/stores/user'
//import { Physician, UserType } from '@/presets/userData'

let _router: Router
let user: any


const AddPage = async function(
    dir: string,
    comp: any,
    title: string,
    icon?: Component,
    noMenu?: boolean
    ) {
    console.log('Adding new pages')
    if (
    _routes_.find((e) => 
        e.name === title
    ) === undefined
    ) {
    let templateRoute: RouteRecordRaw
    if (noMenu) {
        templateRoute = {
        path: '/' + dir,
        name: title,
        component: comp,
        meta: {
            hidden: true,
            breadcrumb: false,
        },
        }
    } else {
        console.log('menu item adding')
        templateRoute = {
        path: '/',
        component: Layout,
        redirect: '/' + dir,
        meta: {
            // breadcrumb: false,
        },
        name: title,
        children: [
            {
            path: dir,
            name: title,
            component: comp,
            meta: {
                title: title,
                icon: icon,
                keepAlive: true,
                hidden: false,
            },
            },
        ],
        }
    }
    _routes_.push(templateRoute)
    _router.addRoute(templateRoute)
    await _router.push(dir)
    if (!noMenu) {
        currRoutes.refreshRoutes()
    }
    }
}
const initUser = {
    setRouter: (router: Router) => (_router = router),
    setUser: (__user: any) => (user = __user),
    initPages: function() {
        AddPage(
        'rankings',
        () => import('@/views/rankings.vue'),
        '排行榜',
        UserFilled,
        false
        )
        AddPage(
        'scores',
        () => import('@/views/judge_result.vue'),
        '评测得分',
        Notebook,
        false
        )
        _router.replace('/dashboard')
    }
}
export default initUser