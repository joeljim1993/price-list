import {
    of,
    BehaviorSubject,
    timer,
    map,
    tap,
    mergeMap,
    takeUntil,
  } from "rxjs";
  import { fromFetch } from "rxjs/fetch";
  import {ShoppingList} from "../../shared/models/shopping-list.model"
  
 class CoreService {

    shoppingAvailables = [];

    getData() {
        const data = {
          operationName: null,
          variables: {},
          query: `
          query {
              currentPriceList{
                  products{
                  edges{
                    node{
                           product{
                        id
                        name
                        images
                      }
                    }
                  }
                  }
                }
        }
        `,
        };
    
        const options = {
          method: "POST",
          body: JSON.stringify(data),
          headers: new Headers({ "content-type": "application/json" }),
        };
        const url = "https://kana.develop.cecosesola.imolko.net/graphql";
        const data$ = fromFetch(url, options).pipe(
          tap((info) => console.log("data", info)),
          mergeMap((response) => {
            return response.json();
          }),
          map((info) => info.data.currentPriceList.products.edges),
          tap((info) => console.log("info despues del map", info)),
          map((info) =>
            info.map((item) => this._listProduct.push(item.node.product))
          ),
          tap(() => console.log("ESTA es _listProduct", this._listProduct))
        );
        data$.subscribe();
      }

      createShoppingList$(name, amount){
        const id = this.shoppingAvailables.length;
        const shopping =   new ShoppingList(id, name, amount); 
        this.shoppingAvailables= this.shoppingAvailables.concat([shopping]);
        return of(shopping)
      }

      getShoppingListAvailable(){
        const availables$ = this.shoppingAvailables;
        return of(availables$)
        }
      
}
export const service = new CoreService();