import { Recipe } from '../recipe.model';
import * as recipeActions from './recipe.actions'


export interface State {
    recipes: Recipe[];
}

const initialState:State = {
    recipes: []
}


export function RecipeReducer(state:State = initialState, action:recipeActions.RecipeActions)
{
    switch(action.type)
    {
        case recipeActions.SET_RECIPES:
            return {...state, recipes:[...action.payload]}

        case recipeActions.ADD_RECIPES:
            return {...state, recipes:[...state.recipes, action.payload]}
            

        case recipeActions.UPDATE_RECIPE:
            const updatedRecipe = {...state.recipes[action.payload.index], ...action.payload}

            const newRecipes = [...state.recipes]
            newRecipes[action.payload.index] = updatedRecipe

            return{...state, recipes:newRecipes}
        
        case recipeActions.DELETE_RECIPE:
            let updatedRecipes = state.recipes.filter((el, index)=>{
                return index !== action.payload
            })

            return {...state, recipes:updatedRecipes}

        default: 
            return state
    }    

}