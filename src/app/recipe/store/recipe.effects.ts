import { Actions, Effect, ofType } from '@ngrx/effects';
import * as recipesActions from '../store/recipe.actions'
import { switchMap,map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../recipe.model';
import { Injectable } from '@angular/core';

@Injectable()
export class RecipeEffects
{
    constructor(private actions$:Actions, private http:HttpClient){}

    @Effect()
    fetchRecipes = this.actions$.pipe(ofType(recipesActions.FETCH_RECIPES),switchMap(()=>{
        return this.http.get<Recipe[]>('https://ngcourserecipe.firebaseio.com/recipes.json')
    }), map((recipes:Recipe[])=>{
    
            
        return recipes.map((data:Recipe)=>{    
            
           return {...data, ingridients: data['ingridients']? data['ingridients']: [] }
        })

    }), map((recipe)=>{
        return new recipesActions.SetRecipes(recipe)
    })
    
    
    )
}