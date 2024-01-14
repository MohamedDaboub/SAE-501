import { createRouter, createWebHistory,  } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '../views/LoginView.vue'
import IncriptionView from '../views/InscriptionView.vue'
import InspirationsView from '../views/InspirationsView.vue'
import MontreView from '../views/Utilisateurs/index.vue'
import editView from '../views/Utilisateurs/edit/[id].vue'
import  {AuthService}  from '../utils/AuthService.js'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {path: '/',              name: 'home',               component: HomeView ,     props: true, beforeEnter: AuthService },
    {path: '/about',         name: 'about',              component: AboutView,    props: true, beforeEnter: AuthService  },
    {path: '/login',         name: 'login',              component: LoginView},
    {path: '/inscription',   name: 'inscription',        component: IncriptionView,},
    {path: '/inspirations',  name: 'inspirations',       component: InspirationsView ,props: true, beforeEnter: AuthService,},
    {path: '/montre',        name: 'montre',             component: MontreView   ,props: true, beforeEnter: AuthService,},
    {
      path: '/watch-details/:id',
      name: 'watch-details',
      component: () => import('@/views/WatchDetails.vue'), // Replace with the actual component for watch details
      props: true,
    },
    {
      path: '/Montre-edit/:id',
      name: 'Montre-edit-id',
      component: editView,
      // ...
    }


  ]
})

export default router