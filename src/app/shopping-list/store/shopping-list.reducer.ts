import {Ingridient} from '../../Shared/ingridient.model'
import * as shoppingListAction from './shopping-list.actions'

export interface State{
    ingridients:Ingridient[];
    editedIngridient:Ingridient;
    editedIndex:number;
}


const initialState:State = {
    ingridients:[
        new Ingridient("Apple", 5),
        new Ingridient("Tomatoes", 10),
        new Ingridient("Onion", 10),
        ],
        editedIngridient:null,
        editedIndex:-1

}



export function ShoppingListReducer(state:State=initialState, action:shoppingListAction.ShoppingList)
{

    switch(action.type)
    {

        case shoppingListAction.START_EDIT:
            return {
                ...state, editedIndex: action.payload, editedIngridient: {...state.ingridients[action.payload]}
            }
        
        case shoppingListAction.STOP_EDIT:
            return {
                ...state, editedIndex: -1, editedIngridient:null
            }

        case shoppingListAction.ADD_INGRIDIENT:
            return {...state, ingridients:[...state.ingridients, action.payload]}


        case shoppingListAction.ADD_INGRIDIENTS:
            return {...state, ingridients:[...state.ingridients, ...action.payload]}
        
        case shoppingListAction.UPDATE_INGRIDIENTS:

            const updatedIngridient = {...action.payload}
            const updatedIngridients = [...state.ingridients];

            updatedIngridients[state.editedIndex] = updatedIngridient

            return {...state, ingridients:updatedIngridients, editedIndex: -1, editedIngridient:null}


        case shoppingListAction.DELETE_INGRIDIENTS:

            const ingridients = [...state.ingridients]
            const updatedArray =  ingridients.filter((item, index)=>{
                return index !== state.editedIndex
            })

            return {...state, ingridients:updatedArray,editedIndex: -1, editedIngridient:null}
        
        default:
            return state
    }

}