import { Action } from '@ngrx/store';


export const LOGIN_START ="LOGIN_START";
export const AUTHENTICATE_FAILED = "AUTHENTICATE_FAILED";
export const SIGN_UP_START = "SIGN_UP_START";
export const CLEAR_ERROR = "CLEAR_ERROR";
export const AUTHENTICATE_SUCCESS = "AUTHENTICATE_SUCCESS ";
export const AUTO_LOGIN = "AUTO_LOGIN";
export const LOGOUT = "LOGOUT";


export class AuthenticateSuccess implements Action{
    readonly type = AUTHENTICATE_SUCCESS;
    
    constructor(public payload:{email:string, 
        userId:string, 
        token:string, 
        redirect:boolean,
        expirationDate:Date})
    {

    }

}

export class AutoLogin implements Action
{
    readonly type = AUTO_LOGIN;

}

export class ClearError implements Action
{
    readonly type = CLEAR_ERROR;
}

export class Logout implements Action{
    readonly type = LOGOUT;
    
    constructor()
    {

    }
}

export class AuthenticateFailed implements Action 
{
    readonly  type = AUTHENTICATE_FAILED;
    constructor(public payload:string){}
}

export class LoginStart implements Action{
    readonly type = LOGIN_START

    constructor(public payload:{email:string, password:string}){}
}

export class SignUpStart
{
    readonly type = SIGN_UP_START

    constructor(public payload:{email:string, password:string}){}
}

export type AuthActions = AuthenticateSuccess | Logout | LoginStart | 
AuthenticateFailed | SignUpStart | ClearError | AutoLogin;

