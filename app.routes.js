import { routes as routes_shoppingCart } from "./src/app/features/shopping-cart/shopping-cart.routes";

export const routes = [
    { path: '/', component: 'home-browse' },
    { path: '/browse/', component: 'home-browse' },
    { path: '/filter/:name', component: 'view-filtered' },
    { path: '/shopping-cart/', children: routes_shoppingCart, },
    { path: '/favorites/', component: 'favorites-browse' },
    { path: '/page-not-found/', component: 'page-not-found' },
    { path: '(.*)', redirect: '/page-not-found/' },
  ]
