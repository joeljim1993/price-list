
import { routes as routes_browse } from "./src/app/features/shoppingList/shoppinglist.routes"

export const routes = [
    { path: '/', component: 'home-features' },
    { path: '/browse',  children: routes_browse, component: 'home-browse' },
  ]