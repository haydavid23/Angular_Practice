import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer'
import * as fromAuth from '../Auth/store/auth.reducer'
import { ActionReducerMap } from '@ngrx/store'
import * as fromRecipes from '../recipe/store/recipe.reducer'

export interface AppState
{
    shoppingList:fromShoppingList.State;
    Auth:fromAuth.State;
    recipes:fromRecipes.State;
    
}

export const AppReducer:ActionReducerMap<AppState> ={
    
    shoppingList:fromShoppingList.ShoppingListReducer,
    Auth:fromAuth.authReducer,
    recipes:fromRecipes.RecipeReducer
}