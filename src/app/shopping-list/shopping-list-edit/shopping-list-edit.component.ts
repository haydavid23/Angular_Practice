import { Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {Ingridient} from '../../Shared/ingridient.model'
import { ShoppingListService } from '../shopping-list.service';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as shoppingListActions from '../store/shopping-list.actions'
import * as fromApp from '../../store/app.reducer'





@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {

  constructor(private service:ShoppingListService, private store:Store<fromApp.AppState>) { }
@ViewChild("f", {static:false}) spListForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editItem:Ingridient;
  ngOnInit() {
    this.store.select('shoppingList').subscribe((stateData)=>{
      if(stateData.editedIndex > -1){
        this.editMode =true;
        this.editItem = stateData.editedIngridient
        this.spListForm.setValue({name:this.editItem.name, amount:this.editItem.amount})

      }
      else{
        this.editMode = false
      }
    })
    this.subscription = this.service.onEditIngridient.subscribe((index)=>{
        this.editMode = true;
        this.editItem = this.service.getIndgridient(index)
        
    })
  }

  ngOnDestroy()
  {
    this.subscription.unsubscribe()
    this.store.dispatch(new shoppingListActions.StopEdit())

  }

  ingridientAdd(form){
    
    let value = form.value
    const ingridient =  new Ingridient(value.name, value.amount);
    if(this.editMode)
    {
      this.store.dispatch(new shoppingListActions.UpdateIngridients(ingridient))
      //this.service.updateIngridient(this.editItemIndex, ingridient)
    }
    else
    {
      
      //this.service.addIngridient(ingridient);
      this.store.dispatch(new shoppingListActions.AddIngridient(ingridient));

      this.store.select('shoppingList').subscribe((data)=>{
        console.log(data)
      })
    }
    this.editMode = false
    form.reset();
    this.store.dispatch(new shoppingListActions.StopEdit())
    

  }

  onClear()
  {
    this.editMode = false;
    this.spListForm.reset();
  }

  onDelete()
  {
    this.store.dispatch(new shoppingListActions.DeleteIngridients())
    //this.service.deleteIngridient(this.editItemIndex)
    this.editMode=false
    this.spListForm.reset()
  }

}
