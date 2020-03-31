import {Recipe} from './recipe.model'

import { Ingridient } from '../Shared/ingridient.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer'


@Injectable({providedIn: "root"})
export class RecipeService{

    constructor(public store:Store<fromApp.AppState>){}
    

    /*public recipeArray:Array<Recipe>=[
    new Recipe("Steak","New York Style Steak",
    "https://cf.ltkcdn.net/cooking/images/std/202901-675x450-NYstrip.jpg",
    [new Ingridient("meat", 1), new Ingridient("Onion",3)]), 

    new Recipe("Chicken", 
    "Fried Chicken",
    "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2012/11/2/0/DV1510H_fried-chicken-recipe-10_s4x3.jpg.rend.hgtvcom.826.620.suffix/1568222255998.jpeg", 
    [new Ingridient("bun", 1), new Ingridient("tomatoes",3)])
];*/

public recipeArray = []

recipeChanged = new Subject();

getRecipes(){
    return this.recipeArray.slice();
}

getRecipe(id){
    return this.recipeArray.slice()[id];
}

newGetRecipe(id)
{
    return this.recipeArray[id];
}

addRecipe(recipe:Recipe)
{
    this.recipeArray.push(recipe)
    this.recipeChanged.next(this.recipeArray)
}

updateRecipe(index, recipe:Recipe)
{

    this.recipeArray[index]=recipe
    this.recipeChanged.next(this.recipeArray)

}

deleteRecipe(id)
{
    this.recipeArray.splice(id, 1)
    this.recipeChanged.next(this.recipeArray)
}

setRecipes(recipes)
{
   
    this.recipeArray = recipes
    this.recipeChanged.next(this.recipeArray)
    

    
}





}