import { NgModule } from "@angular/core";
import { RecipeComponent } from "./recipe.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import {AuthGuard} from '../Auth/auth.guard'
import {RecipeResolver} from '../../app/recipe/recipes-resolver.service'
import { Routes, RouterModule } from "@angular/router";



const routes:Routes = [
  
    {path:'', component:RecipeComponent, canActivate:[AuthGuard], children:[
      {path:'', component:RecipeStartComponent},
      {path:"new", component:RecipeEditComponent},
      {path:":id", component:RecipeDetailComponent, resolve:[RecipeResolver]},
      
      {path:":id/edit", component:RecipeEditComponent, resolve:[RecipeResolver]}
    ]}
  
  ];

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]


})
export class RecipeRoutingModule{}