import {
    of,
    BehaviorSubject,
    map,
    tap,
    takeUntil,
    mergeMap,
  } from "rxjs";
import { fromFetch } from "rxjs/fetch";


class DataService{
 

    getListProductFromKana$(){
      let prueba = [];
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
                          presentation
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
            tap((info) => console.log("data", info.json)),
            mergeMap((response) => {
              return response.json();
            }),
            map((info) => info.data.currentPriceList.products.edges),
            tap((info)=> this.prueba = info),
            tap((info) => console.log("info despues del map", info)),
            
            // map((info) =>
            //   info.map((item) => this._listProduct.push(item.node.product))
            // ),
            // tap(() => console.log("ESTA es _listProduct", this._listProduct))
          );
          data$.subscribe();
          console.log("ESTO ES LO QUE ALMACENO", this.prueba
          );
    }
}
export const dataService = new  DataService();