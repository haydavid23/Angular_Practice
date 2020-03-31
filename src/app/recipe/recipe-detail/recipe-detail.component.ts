import { Component, OnInit} from '@angular/core';
import {ShoppingListService} from '../../shopping-list/shopping-list.service'
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Store } from '@ngrx/store';
import * as recipeActions from '../store/recipe.actions'
import * as fromApp from '../../store/app.reducer'
import { Ingridient } from 'src/app/Shared/ingridient.model';
import * as shoppingListActions from '../../shopping-list/store/shopping-list.actions'
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  constructor(public slService:ShoppingListService, private route:ActivatedRoute, public recipeService:RecipeService,
    private router:Router,private store:Store<fromApp.AppState>) { }

  selectedRecipe:any;
  id;


  ngOnInit() {
    this.route.params.subscribe((data)=>{
     this.id =  data["id"];
     
      this.store.select('recipes').pipe(map((state)=>{
    
        return state.recipes.find((recipe, index)=>{return index == this.id })
      })).subscribe((recipe)=>{
        
        this.selectedRecipe = recipe
      })

      })

     //this.selectedRecipe = this.recipeService.newGetRecipe(this.id)

    
  }

  deleteRecipe()
  {
    this.store.dispatch(new recipeActions.DeleteRecipe(this.id))
    //this.recipeService.deleteRecipe(this.id)
  
    this.router.navigate(["recipes"])
  }

  toShoppingList(ingridients){
    
    this.store.dispatch(new shoppingListActions.AddIngridients(ingridients))
  
  }

  onEditRecipe()
  {
    this.router.navigate(["edit"], {relativeTo:this.route})
  }




}
