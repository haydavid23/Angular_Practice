import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer'
import * as recipesActions from '../store/recipe.actions';
import { map } from 'rxjs/operators';



@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id:number;
  editMode:boolean = false;
  recipeForm:FormGroup;

  constructor(private route:ActivatedRoute, private recipeService:RecipeService, private router:Router, private store:Store<fromApp.AppState>) { }

  ngOnInit() {
    this.route.params.subscribe((data)=>{
      this.id = +data["id"];
   
       this.editMode = data["id"] != null
     
      this.initForm();
    })
  }
  get ingridientArray()
  {
    
      return (<FormArray>this.recipeForm.get('ingridients')).controls
    
  }

  onCancel()
  {
    this.router.navigate(["../"], {relativeTo:this.route})
  }
  
  onIngridientAdd()
  {
    
    let array = this.recipeForm.get("ingridients") as FormArray

      array.push(new FormGroup({
        'name': new FormControl(null, Validators.required),
        "amount": new FormControl(null, [Validators.required, Validators.pattern(/^[1-9][0-9]*$/)])
      }))

     

      
  }

  private initForm()
  {
    

    let recipeName=""
    let recipeImagePath=""
    let recipeDescription=""
    let recipeIngridients = new FormArray([])
    if(this.editMode)
    {
      this.store.select('recipes').pipe(map((state)=>{
        return state.recipes.find((recipes, index)=>{
          return index == this.id
        })
      })).subscribe((recipe)=>{
        recipeName = recipe.name
        recipeImagePath = recipe.imagePath
        recipeDescription = recipe.description;
        if(recipe['ingridients'])
        {
          for(let ingridient of recipe.ingridients)
          {
            console.log(ingridient)
            recipeIngridients.push(new FormGroup({
              'name': new FormControl(ingridient.name, Validators.required),
              'amount': new FormControl(ingridient.amount, [Validators.required, Validators.pattern(/^[1-9][0-9]*$/)])
            }))
          }
        }

      })

      //const recipe = this.recipeService.getRecipe(this.id)
    
   
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingridients': recipeIngridients
    })

   
  }

  onSubmit()
  {
    
    if  (this.editMode)
    {
      //this.recipeService.updateRecipe(this.id, this.recipeForm.value)
      this.store.dispatch(new recipesActions.UpdateRecipe({index:this.id, newRecipe:this.recipeForm.value}))
      
      
    }
    else 
    {
      //this.recipeService.addRecipe(this.recipeForm.value)
      this.store.dispatch(new recipesActions.AddRecipe(this.recipeForm.value))

      this.store.select('recipes').subscribe((recipes)=>{
      
      })
      
    }
    this.onCancel()
  }

  onDeleteIngridient(i)
  {
    let formArray = this.recipeForm.get("ingridients") as FormArray
    formArray.removeAt(i)
    
  }


  

}
