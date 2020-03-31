import {Action} from '@ngrx/store'
import {Ingridient} from '../../Shared/ingridient.model'


export const ADD_INGRIDIENT = "ADD_INGRIDIENT";
export const ADD_INGRIDIENTS = "ADD_INGRIDIENTS";
export const UPDATE_INGRIDIENTS = "UPDATE_INGRIDIENTS";
export const DELETE_INGRIDIENTS = "DELETE_INGRIDIENTS";
export const START_EDIT = "START_EDIT";
export const STOP_EDIT= "STOP_EDIT";


export class StopEdit implements Action{
    readonly type = STOP_EDIT;
}

export class StartEdit implements Action{
    readonly type = START_EDIT;

    constructor(public payload:number){}
}

export class AddIngridient implements Action{

    readonly type = ADD_INGRIDIENT;

    constructor(public payload:Ingridient){}
    
}

export class AddIngridients implements Action{

    readonly type = ADD_INGRIDIENTS;

    constructor(public payload:Ingridient[]){}
    
}

export class UpdateIngridients implements Action{

    readonly type = UPDATE_INGRIDIENTS;

    constructor(public payload:Ingridient){}
    
}

export class DeleteIngridients implements Action{

    readonly type = DELETE_INGRIDIENTS;

    
}



export type ShoppingList = AddIngridient | AddIngridients | 
UpdateIngridients | DeleteIngridients | StartEdit | StopEdit;