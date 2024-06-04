import { createRouter, createWebHistory } from 'vue-router'
import home from './home'
import member from './personal'
import admin from './admin'
const routers =[
  ...home,...member,...admin,
  // otherwise redirect to home
  { path: '/:catchAll(.*)', redirect: '/' }
]

const router = createRouter(
    {
        history:createWebHistory(),
        routes: routers
    },
)



export default router;