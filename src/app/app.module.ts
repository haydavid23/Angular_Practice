import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {StoreModule} from '@ngrx/store'
import { HeaderComponent } from './header/header.component';
import { SharedModule } from './Shared/share.module';
import { CoreModule } from './core.module';
import { LogginService } from './loggin.service';
import * as fromAppReducer from './store/app.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './Auth/auth.effects';
import { RecipeEffects } from './recipe/store/recipe.effects';







@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(fromAppReducer.AppReducer),
    EffectsModule.forRoot([AuthEffects, RecipeEffects]),
    SharedModule,
    CoreModule
  ],

  providers:[
    LogginService
  ],
 
  
  bootstrap: [AppComponent]
})
export class AppModule { }
