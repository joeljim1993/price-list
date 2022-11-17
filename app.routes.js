
import { routes as routes_browse } from "./src/app/features/shopping-list/shopping-list.routes.js"

export const routes = [
    { path: '/', component: 'home-features' },
    { path: '/browse/:shoppingId',  children: routes_browse, component: 'home-browse' },
    { path: '/shoppinglist',  children: routes_browse, component: 'shopping-cart-list' },


  ]