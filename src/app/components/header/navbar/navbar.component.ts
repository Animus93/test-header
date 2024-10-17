import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Navigation} from "../header.interface";
import {ClickOutsideDirective} from "../../../directives/click-outside.directive";

@Component({
  selector: 'app-navbar',
  standalone: true,
    imports: [
        ClickOutsideDirective
    ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
@Input() navigation?: Navigation[];
@Output() close = new EventEmitter<any>();
}
