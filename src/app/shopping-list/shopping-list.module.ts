import {NgModule} from '@angular/core'
import {ShoppingListComponent} from './shopping-list.component'
import {ShoppingListEditComponent} from './shopping-list-edit/shopping-list-edit.component'
import { ReactiveFormsModule, FormsModule,} from '@angular/forms'
import{SharedModule} from '../Shared/share.module'
import { ShoppingListRouting } from './shopping-list.routing.module'
import { LogginService } from '../loggin.service'



@NgModule({
    declarations:[
        ShoppingListComponent,
        ShoppingListEditComponent
    ],

    imports:[
       ReactiveFormsModule, ShoppingListRouting,FormsModule, SharedModule
    ],

    providers:[
        LogginService
    ]
})

export class ShoppingListModule
{

}