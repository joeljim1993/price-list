
import { routes as routes_browse } from "./src/app/features/shopping-list/shopping-list.routes.js"

export const routes = [
    { path: '/', component: 'home-browse' },
    { path: '/browse/',  children: routes_browse, component: 'home-browse' },
    { path: '/features/shoppinglist/',  children: routes_browse, component: 'shopping-cart-list' },
    { path: '/page-not-found/', component: 'page-not-found' },
    { path: '(.*)', redirect: '/page-not-found/' },
  ]