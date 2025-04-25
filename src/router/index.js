import { createWebHistory, createRouter } from 'vue-router'

import AddProduct from '../views/AddProduct.vue'
import EditProduct from '../views/EditProduct.vue'

const routes = [
  { path: '/', component: AddProduct },
  { path: '/:id', component: EditProduct }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router