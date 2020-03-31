import { Injectable } from '@angular/core';

    
//@Injectable({providedIn:"root"})
export class LogginService{
    lastLog:string;

    printLog(message)
    {
    
        this.lastLog = message;
    }
}