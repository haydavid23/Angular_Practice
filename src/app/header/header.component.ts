import { Component, OnInit, Output,EventEmitter } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  @Output() routing:EventEmitter<string> = new EventEmitter();

  ngOnInit() {
  }

  navegation(route:string){

    this.routing.emit(route);
  }

}
