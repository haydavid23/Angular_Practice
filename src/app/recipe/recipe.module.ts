import {NgModule} from '@angular/core'
import {RecipeComponent} from './recipe.component'
import {RecipeListComponent} from './recipe-list/recipe-list.component'
import {RecipeDetailComponent} from './recipe-detail/recipe-detail.component'
import {RecipeItemComponent} from './recipe-list/recipe-item/recipe-item.component'
import {RecipeStartComponent} from './recipe-start/recipe-start.component'
import {RecipeEditComponent} from './recipe-edit/recipe-edit.component'
import {SharedModule} from '../Shared/share.module'
import { ReactiveFormsModule } from '@angular/forms'
import {RecipeRoutingModule} from './recipe.routing.module'
import { RouterModule } from '@angular/router'



@NgModule({
    declarations:[
        RecipeComponent,
        RecipeListComponent,
        RecipeDetailComponent,
        RecipeItemComponent,
        RecipeStartComponent,
        RecipeEditComponent
    ],
    imports:[ReactiveFormsModule, RecipeRoutingModule, SharedModule, RouterModule]

})
export class RecipeModule{}