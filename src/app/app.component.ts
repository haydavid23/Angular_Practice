import { Component, OnInit } from '@angular/core';
import { AuthService } from './Auth/auth.service';
import { LogginService } from './loggin.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../app/store/app.reducer'
import * as authActions from '../app/Auth/store/auth.actions'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'udemyFinalProject';
  public pathTo:string = "Recipe";

  constructor(private store:Store<fromApp.AppState>, private LogginService:LogginService)
  {

  }

ngOnInit()
{
this.store.dispatch(new authActions.AutoLogin());
this.LogginService.printLog("Hello From appComponent NgOnInit")

}

}
