
import { routes as routes_browse } from "./src/app/features/shopping-list/shopping-list.routes.js"

export const routes = [
    { path: '/', component: 'home-browse' },
    { path: '/browse/:shoppingId',  children: routes_browse, component: 'home-browse' },
    { path: '/shoppinglist',  children: routes_browse, component: 'shopping-cart-list' },
  ]