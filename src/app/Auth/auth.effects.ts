import {Actions,ofType, Effect, EffectsModule} from '@ngrx/effects'
import * as fromAuth from '../Auth/store/auth.actions'
import { switchMap, catchError, map, tap } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http'
import { of, from } from 'rxjs'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { User } from './user.model'
import { AuthService } from './auth.service'




export interface AuthResponseData
{
    idToken:string,
    email:string,
    refreshToken:string,
    expiresIn:string,
    localId:string,
    registered?:boolean
}

const handleAuthentication = (expiresIn:number, email:string, userId:string, token:string)=>{
    const expirationDate  = new Date(new Date().getTime() + +expiresIn * 1000)
    const user = new User(email, userId, token, expirationDate)

    localStorage.setItem('userData', JSON.stringify(user))

    return new fromAuth.AuthenticateSuccess({email:email, userId:userId, 
        token:token, redirect:true,expirationDate:expirationDate});
};

const handleError = (errorResponse)=>{
    let error = 'an unknown Error has occur'
    if(!errorResponse.error || !errorResponse.error.error)
    {
        return of(new fromAuth.AuthenticateFailed(error))
    }
    switch(errorResponse.error.error.message)
    {
        case 'EMAIL_EXISTS':
            error = "This email already exists"
            break

        case 'EMAIL_NOT_FOUND':
            error = "Email not Found"
            break
        
        case 'INVALID_PASSWORD':
            error = 'Invalid Password'
            break
            
    }

    return of( new fromAuth.AuthenticateFailed(error))
};

@Injectable()
export class AuthEffects
{
    constructor(private actions$:Actions, private http:HttpClient, private router:Router, private authService:AuthService){}


    @Effect({dispatch:false})
    authLogout = this.actions$.pipe(ofType(fromAuth.LOGOUT), tap(()=>{
        this.authService.clearLogoutTimer();
        localStorage.removeItem('useData');
        this.router.navigate(['/auth'])
        
    }))

    @Effect()
    autoLogin = this.actions$.pipe(ofType(fromAuth.AUTO_LOGIN), map(()=>{
        const userData:{
            email:string,
            id:string,
            _token:string,
            _tokenExpiration:string} = JSON.parse(localStorage.getItem("userData"))

        if(!userData)
        {
            return {type:'DUMMY'}
        }
        console.log(userData._token)

        const loadedUser = new User(userData.email, userData.id,userData._token, new Date(userData._tokenExpiration))
        
        if(loadedUser.token)
        {
            const expirationDuration = new Date(userData._tokenExpiration).getTime() - new Date().getTime()
            this.authService.setLogoutTimer(expirationDuration)
    
          return new fromAuth.AuthenticateSuccess({email:userData.email, userId:userData.id, token:userData._token, redirect:false, expirationDate:new Date(userData._tokenExpiration)})
       
        }
        return {type:'DUMMY'}
    }))


    

    @Effect()
    authLogin = this.actions$.pipe(ofType(fromAuth.LOGIN_START),
    switchMap((authData:fromAuth.LoginStart)=>{
        return this.http.post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCkYUJ7iQnx9dapQovNgfqf-sJPaXzT8PQ",
        {
            email:authData.payload.email,
            password:authData.payload.password,
            returnSecureToken:true
        }).pipe(tap((respData)=>{
            this.authService.setLogoutTimer(+respData.expiresIn * 1000)
        }),map((respData)=>{
            console.log(respData)
            return handleAuthentication(+respData.expiresIn, respData.email, respData.localId, respData.idToken)
        }),
        catchError((errorResponse)=>{
            return handleError(errorResponse)
              
        }))



    }))

    @Effect({dispatch:false})
    authRedirect = this.actions$.pipe(ofType(fromAuth.AUTHENTICATE_SUCCESS), tap((authenticate:fromAuth.AuthenticateSuccess)=>{
        if (authenticate.payload.redirect)
        {
            this.router.navigate(['/recipes'])
        }
       
    }))

    @Effect({dispatch:false})
    authSignUp = this.actions$.pipe(ofType(fromAuth.SIGN_UP_START),switchMap((action:fromAuth.SignUpStart)=>{
        return this.http.post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCkYUJ7iQnx9dapQovNgfqf-sJPaXzT8PQ",
        {
            
            email:action.payload.email,
            password:action.payload.password,
            returnSecureToken:true
        }).pipe(tap((respData)=>{
            this.authService.setLogoutTimer(+respData.expiresIn * 1000)
        }),map((respData)=>{
            
            return handleAuthentication(+respData.expiresIn, respData.email, respData.localId, respData.idToken)
        }),
        catchError((errorResponse)=>{
          return  handleError(errorResponse)
        }))
    }))

  
}