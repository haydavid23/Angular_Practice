import { Component, OnInit } from '@angular/core';
import {Ingridient} from '../Shared/ingridient.model'
import {ShoppingListService} from './shopping-list.service'
import { LogginService } from '../loggin.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromApp from '../store/app.reducer'
import * as shoppingListActions from '../shopping-list/store/shopping-list.actions'


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']

})
export class ShoppingListComponent implements OnInit {

  ingridients: Observable<{ingridients:Ingridient[]}>;

  constructor(public service: ShoppingListService, 
    private logginService:LogginService, 
    private store:Store<fromApp.AppState> ) { }

  ngOnInit() 
  {
    this.ingridients = this.store.select('shoppingList')
    this.store.select('shoppingList').subscribe((data)=>{
      console.log(data)
    })
    this.logginService.printLog("Hello From shopping-List ngOnInit")
  }

  onEdit(index)
  {
    this.store.dispatch(new shoppingListActions.StartEdit(index))
    //this.service.onEditIngridient.next(index)
  }


}
