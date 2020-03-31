import { Component, ComponentFactoryResolver, ViewChild, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {AuthService} from './auth.service'
import { Observable, Subscription } from 'rxjs';
import {AuthResponseData} from './auth.service'
import { Router } from '@angular/router';
import {PlaceholderDirective} from '../Shared/placeHolder/placeholder.directive'
import {AlertComponent} from '../Shared/alert/alert.component'
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer'
import * as authActions from '../Auth/store/auth.actions'



@Component({
    selector:"auth-component",
    templateUrl:'./auth.component.html'
})
export class AuthComponent implements OnDestroy, OnInit
{
    
    constructor(private authService:AuthService, private router:Router, private componentFactoryResolver:ComponentFactoryResolver,
        public store:Store<fromApp.AppState>){}

    @ViewChild(PlaceholderDirective,{static:false}) alertHost:PlaceholderDirective

    isLogin:boolean = true;
    isLoading:boolean = false;
    error:string = null;
    closeSubs:Subscription;

    sub:Subscription;

    ngOnInit()
    {
       this.sub =  this.store.select("Auth").subscribe((authState)=>{
            this.isLoading = authState.loading;
            this.error = authState.authError;
            if(this.error)
            {
                this.showErrorAlert(this.error)
               
            }
        })
    }

    ngOnDestroy(){
        if(this.closeSubs){
            this.closeSubs.unsubscribe();
        }
        this.sub.unsubscribe();
    }

    onSwitchMode()
    {
        this.isLogin = !this.isLogin;

    }

    onClose()
    {
        this.store.dispatch(new authActions.ClearError())
    }

    onSubmitForm(formValues:NgForm)
    {
        

        const email = formValues.value.email;
        const password = formValues.value.password;


        if(this.isLogin)
        {
           
           this.store.dispatch(new authActions.LoginStart({email:email, password:password}))
        }
        else
        {
           this.store.dispatch(new authActions.SignUpStart({email:email, password:password}))
        }

        
        
        formValues.reset();
    }

    private showErrorAlert(message:string)
    {
        const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent)
        const hostViewContainerRef = this.alertHost.viewContainerRef;

        hostViewContainerRef.clear();
       const componentInstance =  hostViewContainerRef.createComponent(alertComponentFactory);
        componentInstance.instance.message = message;
       this.closeSubs = componentInstance.instance._close.subscribe(()=>{
            this.closeSubs.unsubscribe()
            hostViewContainerRef.clear();
        })
        
    }

}