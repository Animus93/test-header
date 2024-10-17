import {Component, EventEmitter, Output} from '@angular/core';
import {ClickOutsideDirective} from "../../../directives/click-outside.directive";
import {HeaderService} from "../header.service";
import {MenuComponent} from "./menu/menu.component";

@Component({
  selector: 'app-search',
  standalone: true,
    imports: [
        ClickOutsideDirective,
        MenuComponent
    ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
    constructor(public headerService: HeaderService) {
    }

    hideInput():void {
            this.headerService.setInputBlockView(false)
    }

    toggleMenu(value:boolean):void {
        this.headerService.menuBlock = value
    }
}
