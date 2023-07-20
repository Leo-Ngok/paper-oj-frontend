import { _routes_ } from "@/router"
import { ref, Ref } from "vue"
import { RouteRecordRaw } from "vue-router"


class CurrRoutes {
    private routes: Ref<RouteRecordRaw[]>

    constructor(routes?: RouteRecordRaw[]) {
      this.routes = ref(routes || [])
    }
  
    refreshRoutes(newRoutes?: RouteRecordRaw[]) {
      this.routes.value = newRoutes ? [...newRoutes] : _routes_
    }
  
    getRoutes() {
      return this.routes.value
    }
}

const currRoutes = new CurrRoutes()
export default currRoutes
