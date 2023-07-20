import { removeCookie, setCookie } from "@/utils"
import { defineStore } from "pinia"
import request from "@/utils/request"
import { ElMessage } from "element-plus"
import { Stores } from "types/stores"

import Layout from '@/layout/index.vue'

import { Component } from 'vue'

import { _routes_ } from '@/router'
import { RouteRecordRaw, Router } from 'vue-router'
import currRoutes from './currRoutes'
import { Job } from "@/presets/userData"
let _router: Router

export const userStore = defineStore('user', {
  state: (): Stores.user => ({
    name: '',
    age: null,
    sex: 'unknown',
    token: ''
  }),
  actions: {
   
    async login(username: string, password: string) {
      
      this.name = 'li_tiansuo'//data.name
      this.age = 24//data.age
      this.sex = 'male' //data.sex
      this.token = `${username}Token`
      setCookie('token', this.token)
      //return new Promise((resolve, reject) => {
        /*request.post<Stores.user>('/user/login', {
          username, password
        }).then(res => {
          const { data, msg } = res
          if (data) {
            this.name = data.name
            this.age = data.age
            this.sex = data.sex
            this.token = `${username}Token`
            setCookie('token', this.token)
            resolve(msg)
          } else {
            reject(msg)
          }
        })
      })*/
    },
    async logout() {
      return new Promise((resolve) => {
        request.get<Stores.user>('/user/logout').then((res) => {
          const { msg } = res
          removeCookie('token')
          ElMessage.success(msg)
          resolve(msg)
        })
      })
    },
    async getUserInfo(token: string): Promise<string> {
      return new Promise((resolve, reject) => {
        request.get<Stores.user>('/user/info', {
          params: {
            token: token
          }
        }).then(res => {
          const { data, msg } = res
          if (data) {
            this.name = data.name
            this.age = data.age
            this.sex = data.sex
            this.token = token
            setCookie('token', this.token)
            resolve(msg)
          } else {
            reject(msg)
          }
        })
      })
    },
    async getScores(judge_id: number) : Promise<Job> {
      return new Promise((resolve, reject) => {
        request.get('/jobs/0').then((result)=> {
          console.log(result)
          //resolve()
          resolve(result.cases)
        })
      })
    },
    async getRankings() : Promise<any> {
      return new Promise((resolve, reject) => {
        request.get('/contests/0/ranklist').then((result)=>{
          console.log(result)
          resolve(result)
        })
      })
    }
  }
})