import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'udemyFinalProject';
  public pathTo:string = "Recipe";

  toRoute(path:string){

    this.pathTo = path;

    console.log(this.pathTo)

  }
}
