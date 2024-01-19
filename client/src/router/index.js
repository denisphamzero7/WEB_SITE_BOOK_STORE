import { createRouter,createWebHistory } from 'vue-router'
import home from './home'
const routers =[
...home,
  // otherwise redirect to home
  { path: '/:catchAll(.*)', redirect: '/' }
]
const router = createRouter(
    {
        history:createWebHistory(),
        routes: routers
    },
    
)
export default router