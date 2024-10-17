import {Injectable, signal, WritableSignal} from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class HeaderService {
    private inputBlock = new Subject<boolean>();
    public inputBlock$ = this.inputBlock.asObservable();
    public menuBlock: boolean = false
    public searchMobile: WritableSignal<boolean> = signal(false)
    setInputBlockView(value: boolean): void {
            this.inputBlock.next(value)
    }
}
