import { createRouter, createWebHistory,  } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import InscriptionView from '../views/InscriptionView.vue'
import InspirationsView from '../views/InspirationsView.vue'
import MontreView from '../views/Utilisateurs/index.vue'
import editView from '../views/Utilisateurs/edit/[id].vue'
import  {AuthService}  from '../utils/AuthService.js'
import PanierView from '../views/PanierView.vue'
import WatchDetailsView from '../views/Details/Watchdetails.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {path: '/',                     name: 'home',                     component: HomeView ,           props: true, beforeEnter: AuthService },
    {path: '/login',                name: 'login',                    component: LoginView,                                                 },
    {path: '/Inscription',          name: 'Inscription',              component: InscriptionView,                                           },
    {path: '/inspirations',         name: 'inspirations',             component: InspirationsView ,   props: true, beforeEnter: AuthService,},
    {path: '/montre',               name: 'montre',                   component: MontreView   ,       props: true, beforeEnter: AuthService,},
    {path: '/panier',               name: 'panier',                   component: PanierView   ,       props: true, beforeEnter: AuthService,},
    { path: '/watchdetails/:id',    name: 'watchdetails',             component: WatchDetailsView, props: true },
    {path: '/Montre-edit/:id',      name: 'Montre-edit-id',           component: editView,            props: true,},


  ]
})

export default router