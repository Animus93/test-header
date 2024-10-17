import {Component, OnDestroy, Renderer2, ViewChild, ViewContainerRef} from '@angular/core';
import {Navigation} from './header.interface';
import {NgOptimizedImage} from '@angular/common';
import {NotificationComponent} from "./notification/notification.component";
import {SearchComponent} from "./search/search.component";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {ClickOutsideDirective} from "../../directives/click-outside.directive";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";
import {HeaderService} from "./header.service";
import {Subject, takeUntil} from "rxjs";
import {Router} from "@angular/router";
import {NavbarComponent} from "./navbar/navbar.component";

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [
        NgOptimizedImage,
        NotificationComponent,
        SearchComponent,
        ClickOutsideDirective,
        NavbarComponent
    ],
    templateUrl: './header.component.html',
    animations: [
        trigger('openClose', [
            // ...
            state(
                'open',
                style({
                    width: '100%',
                    // opacity: 1,
                }),
            ),
            state(
                'closed',
                style({
                    width: '0px',
                    // opacity: 0,
                }),
            ),
            transition('open => closed', [animate('.2s')]),
            transition('closed => open', [animate('.2s')]),
        ]),
    ],
    styleUrl: './header.component.css'
})
export class HeaderComponent implements OnDestroy {
    @ViewChild('mobileNav', {read: ViewContainerRef}) mobileNav!: ViewContainerRef;
    private unsubscribeAll = new Subject();
    public inputBlockAnimation: boolean = false
    public inputBlockView: boolean = false

    constructor(public headerService: HeaderService, public router: Router, private renderer: Renderer2) {
        this.headerService.inputBlock$.pipe(takeUntil(this.unsubscribeAll)).subscribe(value => {
            this.inputBlockAnimation = value;
            if (value) {
                this.inputBlockView = value
            } else {
                this.headerService.menuBlock = false
            }
        })
    }

    public navigation: Navigation[] = [
        {
            name: 'Ссылки',
            icon: 'assets/images/icons/link.svg'
        },
        {
            name: 'Контакты',
            icon: 'assets/images/icons/contacts.svg'
        },
        {
            name: 'Теги',
            icon: 'assets/images/icons/tag.svg'
        },
        {
            name: 'Избранное',
            icon: 'assets/images/icons/favorite.svg'
        },
        {
            name: 'Посещения',
            icon: 'assets/images/icons/history.svg'
        },
    ]

    setInputBlockViewHandler(event: any): void {
        if (event.toState === 'closed') {
            this.inputBlockView = false
        }
    }

    showSearchInput(): void {
        if (window.innerWidth > 1024) {
            this.headerService.setInputBlockView(true)
        } else {
            this.headerService.searchMobile.set(true)
        }
    }

    showNavbarMobile(event: MouseEvent): void {
        this.mobileNav.clear()
        const componentRef = this.mobileNav.createComponent(NavbarComponent);
        componentRef.instance.navigation = this.navigation;
        componentRef.instance.close.pipe(takeUntil(this.unsubscribeAll)).subscribe(value => {
            this.mobileNav.clear()
        })
        const styles = getComputedStyle((event.target as HTMLElement));
        const element = componentRef.location.nativeElement.querySelector('.block-navbar');
        const rect = (event.target as HTMLElement).getBoundingClientRect()
    }

    ngOnDestroy() {
        this.unsubscribeAll.next(null)
        this.unsubscribeAll.complete()
    }

    protected readonly window = window;
}
