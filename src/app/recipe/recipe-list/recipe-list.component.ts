import { Component, OnInit } from '@angular/core';
import {Recipe} from "../recipe.model"

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipeArray:Array<Recipe>=[new Recipe("Steak","New York Style Steak","https://cf.ltkcdn.net/cooking/images/std/202901-675x450-NYstrip.jpg"), 
  new Recipe("Chicken", "Fried Chicken","https://food.fnr.sndimg.com/content/dam/images/food/fullset/2012/11/2/0/DV1510H_fried-chicken-recipe-10_s4x3.jpg.rend.hgtvcom.826.620.suffix/1568222255998.jpeg")];
  constructor() { }

  ngOnInit() {
  }

}
