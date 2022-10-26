import { fromFetch } from 'rxjs/fetch';
import { mergeMap, tap } from 'rxjs';

 class CoreService {

     url = 'https://kana.develop.cecosesola.imolko.net/graphql'

     stream$ = fromFetch(this.url).pipe(
        mergeMap((response) => {
            return response.json()
        })
     ,
     tap(info => console.log(info))   
     )
    
}
export const service = new CoreService();