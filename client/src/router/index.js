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
// router.beforeEach(async(to,from,next)=>{
//   if(to.matched.some(record=> record.meta.requiresAuth)){
//     //authenticate check
//         const token = localStorage.getItem('token')
//            if(token){
//             // check if token is valid
//             return next()
//            }
//            return next('/login')
//   }
//   next()
// }
// )


export default router;