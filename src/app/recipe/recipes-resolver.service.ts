import {Resolve, ActivatedRouteSnapshot,RouterStateSnapshot} from '@angular/router'
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as recipeActions from '.././recipe/store/recipe.actions'
import {Actions, ofType} from '@ngrx/effects'
import { take, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
 

@Injectable({providedIn:'root'})
export class RecipeResolver implements Resolve<any>{

    constructor(private store:Store<fromApp.AppState>, private actions$:Actions){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    {
        return this.store.select('recipes').pipe(take(1),map((recipeState)=>{
           
            return recipeState.recipes
        }),
            switchMap((recipes)=>{
                
                if(recipes.length === 0)
                {
                    
                    this.store.dispatch(new recipeActions.FetchRecipes())
                    return this.actions$.pipe(ofType(recipeActions.SET_RECIPES), take(1))
                }
                else
                {
                    return of(recipes)
                }
            })
        
        )
      

    }

}