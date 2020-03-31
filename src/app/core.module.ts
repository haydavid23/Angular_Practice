import { NgModule } from '@angular/core';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { RecipeService } from './recipe/recipe.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './Auth/auth-interceptop.service';

@NgModule({
    providers:[
        ShoppingListService, RecipeService, {provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor, multi:true}
    ]
})
export class CoreModule
{

}