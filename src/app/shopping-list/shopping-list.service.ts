import {Ingridient} from '../Shared/ingridient.model'
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';


export class ShoppingListService{

    onEditIngridient = new Subject();

    ingridientChanged = new Subject<any>();

    ingridients:Ingridient[]=[
        new Ingridient("Apple", 5),
        new Ingridient("Tomatoes", 10),
        new Ingridient("Onion", 10)
    
      ];


addIngridient(ingridient:Ingridient){

    this.ingridients.push(ingridient);
    console.log(this.ingridients)
}

updateIngridient(index, newIngridient:Ingridient)
{
    this.ingridients[index] = newIngridient;
}

deleteIngridient(ind:number)
{
    this.ingridients = this.ingridients.filter((el, index)=>{
        return ind !== index
    })
}

getIndgridient(index){
    return this.ingridients[index]
}
    
}