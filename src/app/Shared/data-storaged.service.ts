import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipe/recipe.service';
import {map,tap, take, exhaustMap} from 'rxjs/operators'
import { AuthService } from '../Auth/auth.service';
import { BehaviorSubject, pipe } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer'
import * as recipeActions from '../recipe/store/recipe.actions'
import { Recipe } from '../recipe/recipe.model';


@Injectable({providedIn:'root'})
export class DataStoragedService
{
     constructor(private http:HttpClient, private recipeService:RecipeService, private store:Store<fromApp.AppState>){}

    

    storeRecipe()
    {
        let recipes = this.recipeService.getRecipes();
       
        this.http.put('https://ngcourserecipe.firebaseio.com/recipes.json', recipes).subscribe((response)=>{
        console.log(response)
        })
    }

    fetchRecipes()
    {
       
        return this.http.get<Recipe[]>('https://ngcourserecipe.firebaseio.com/recipes.json').pipe(
        map((recipes:Recipe[])=>{
            
            return recipes.map((data:Recipe)=>{    
                
               return {...data, ingridients: data['ingridients']? data['ingridients']: [] }
            })

        })
        ,tap((recipes:Recipe[])=>{
        
            this.store.dispatch(new recipeActions.SetRecipes(recipes))
            
        })
        )
    }
}