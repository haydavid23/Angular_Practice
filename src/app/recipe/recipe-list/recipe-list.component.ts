import { Component, OnInit, OnDestroy} from '@angular/core';
import {Recipe} from "../recipe.model"
import {RecipeService} from '../recipe.service'
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer'
import { map } from 'rxjs/operators';
import * as fromRecipes from '../store/recipe.reducer'



@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  recipeArray:Array<Recipe>;
  subscription: Subscription;
  constructor(private router:Router, private route:ActivatedRoute,
    private store:Store<fromApp.AppState>, private recipeService:RecipeService){
     
  }


  ngOnInit() {
    
   this.subscription =  this.store.select('recipes').pipe(map((state:fromRecipes.State)=>{
     return state.recipes
   })).subscribe((recipes:Recipe[])=>{
     
      this.recipeArray = recipes
    })

  }

  ngOnDestroy()
  {
    this.subscription.unsubscribe()
  }

  newRecipe()
  {
    this.router.navigate(["new"],{relativeTo:this.route})
  }



}

