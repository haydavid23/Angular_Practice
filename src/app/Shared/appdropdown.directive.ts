import {Directive, HostListener, ElementRef,HostBinding} from '@angular/core';


@Directive({
    selector:"[appDropdown]"
})

export class Appdropdown{

    show_hide_dropdown:string;
    show:boolean = false;

    constructor(private elementRef:ElementRef){}


    @HostListener("click") dropdown(){
        this.show = !this.show;
        console.log("clicked")

        if(this.show == true){
            this.show_hide_dropdown = "show";
        }
        
    }

    @HostBinding('class.show') dropdown_action:string;

}