import {
    map,
    tap,
    mergeMap,
    BehaviorSubject,
    expand,
    EMPTY,
    reduce
  } from "rxjs";
import { fromFetch } from "rxjs/fetch";


class KanaService{

  constructor() {
    this.lisProduct = new BehaviorSubject([]);    
    this.dolarValue = new BehaviorSubject(1);
    this.divisa = 1;
    this.getDolarValue$().subscribe();
  }

  getQuery(query) {
    const url = "https://kana.develop.cecosesola.imolko.net/graphql";
    const dataQuery = {
      operationName: null,
      variables: {},
    };
    const payload = {
      ...dataQuery,
      query,
    }
    const option = {
      method: "POST",
      body: JSON.stringify(payload),
      headers: new Headers({ "content-type": "application/json" }),
    }

    const data$ = fromFetch(url, option)
      .pipe(
        mergeMap(response => response.json()),
      )

    return data$;

  }

  /**
   * Metodo que apunta a los productos en backend de kana
   * @returns un observable
   */
  getListProductFromKana$(limit = 500){
    const query = `
      query {
        currentPriceList{
          products(first: ${limit}){
            edges{
              node{
                product{
                  id
                  name
                  images
                  presentation
                  departments {
                    description
                  }
                  pricePublished{
                    priceBase {
                      amount
                    }
                  }
                }
              }
            }
            pageInfo{
              hasNextPage
              hasPreviousPage
              startCursor
              endCursor  
            }
          }
        }
      }`

    const data$ = this.getQuery(query)
      .pipe(
        //expand(response => response.data.currentPriceList.products.pageInfo.hasNextPage ? this.getQuery( 10 ,response.data.currentPriceList.products.pageInfo.endCursor) : EMPTY),
        // reduce((acc, current) => acc.concat(current), []),
        // expand(response => {
        //   const graph = response.data.currentPriceList.products.pageInfo;
        //   console.log(graph.hasNextPage)
        //   graph.hasNextPage
        //   ? this.getQuery(graph.endCursor)
        //   : EMPTY
        // }),
        // tap(response => console.log(response)),
        map(response => response.data.currentPriceList.products.edges.map(product => {

          const { pricePublished, ...restProduct } = product.node.product;

          const productConstruted = {
            ...restProduct,
            price: Number(pricePublished?.priceBase.amount * this.divisa),
          }

          return productConstruted;
        })),
        tap(response => this.lisProduct.next(response)),
      );
    return data$;
  }

  getDolarValue$() {
    const query = `
      query{
        currentPriceList{
          officialRate{
            forSales{
              value
            }
          }
        }
      }`;

    const data$ = this.getQuery(query)
      .pipe(
        map(response => response.data.currentPriceList.officialRate.forSales[1].value),
        tap(response => this.divisa = response),
        tap(value => this.dolarValue.next(value)),
      )
    return data$;
    
  }
}
export const kanaService = new  KanaService();