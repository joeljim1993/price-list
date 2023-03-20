
import { routes as routes_shoppingCart } from "./src/app/features/shopping-cart/shopping-cart.routes";
import { routes as routes_favorite } from './src/app/features/favorites/favorites.routes.js';

export const routes = [
    { path: '/', component: 'home-browse' },
    { path: '/browse/', component: 'home-browse' },
    { path: '/shopping-cart/', children: routes_shoppingCart, }, // component: 'shopping-cart-list' },
    { path: '/favorites/',  children: routes_favorite, component: 'favorites-browse' },
    { path: '/page-not-found/', component: 'page-not-found' },
    { path: '(.*)', redirect: '/page-not-found/' },
  ]