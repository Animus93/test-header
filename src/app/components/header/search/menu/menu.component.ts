import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
public menuItems = [
    {
        name: 'закрепить теги'
    },
    {
        name: 'кнопка'
    },
    {
        name: 'приложение'
    },
    {
        name: 'форма'
    },
    {
        name: 'текстовое поле'
    },
    {
        name: 'выпадающий список'
    },
    {
        name: 'чекбокс'
    },
    {
        name: 'селект'
    },
    {
        name: 'Хочу работать у вас :)'
    }
]

    public values = [
        {
            name: '',
            items: [
                {name:'Я участник'},
                {name:'Строгий поиск'},
                {name:'В заголовках'}]
        },
        {
            name: 'Только',
            items: [
                {name:'Теги'},
                {name:'Просьбы'},
                {name:'Контакты'}]
        },
    ]
}
