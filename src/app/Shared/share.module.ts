import {NgModule} from '@angular/core'
import {AlertComponent} from '../Shared/alert/alert.component'
import {LoadingSpinner} from '../Shared/loadingSpinner/loadSpinner.component'
import {PlaceholderDirective} from './placeHolder/placeholder.directive'
import {Appdropdown} from './appdropdown.directive'
import { CommonModule } from '@angular/common'


@NgModule({
    declarations:[
        AlertComponent,
        LoadingSpinner,
        PlaceholderDirective,
        Appdropdown

    ],

    imports:[
        CommonModule
    ],

    exports:[
        AlertComponent,
        LoadingSpinner,
        PlaceholderDirective,
        Appdropdown,
        CommonModule

    ],

    entryComponents:[AlertComponent]

    
})
export class SharedModule{}