import { AppComponent } from "./src/app.component";
import { Home } from "./src/app/features/home/home.component";
import { ProductCard } from "./src/app/shared/components/product-card.component"

customElements.define("app-root", AppComponent);
customElements.define('home-features', Home);
customElements.define('card-component', ProductCard);