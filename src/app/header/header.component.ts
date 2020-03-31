import { Component, OnInit, OnDestroy} from '@angular/core';
import { DataStoragedService } from '../Shared/data-storaged.service';
import { AuthService } from '../Auth/auth.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer'
import { map } from 'rxjs/operators';
import * as authAction from '../Auth/store/auth.actions'
import * as recipeActions from '../recipe/store/recipe.actions';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{

  constructor(private storeData:DataStoragedService, private authService:AuthService, private store:Store<fromApp.AppState>) { }
    isAuthenticate = false;
    userSub:Subscription;

  ngOnInit() 
  {
    this.userSub = this.store.select('Auth').pipe(map((authState)=>{return authState.user})).subscribe((user)=>{

      this.isAuthenticate = !user? false : true;

    })
  }

  ngOnDestroy()
  {
    this.userSub.unsubscribe();
  }

  onSaveData()
  {
    this.storeData.storeRecipe();

  }

  fetchData()
  {

    this.store.dispatch(new recipeActions.FetchRecipes());
    

  }

  onLogout()
  {
    this.store.dispatch(new authAction.Logout())
  }



}
