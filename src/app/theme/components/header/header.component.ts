import { Component, OnInit, ViewEncapsulation, HostListener } from '@angular/core';
import { trigger,  state,  style, transition, animate } from '@angular/animations';
import { AppSettings } from '../../../app.settings';
import { Settings } from '../../../app.settings.model';
import { MenuService } from '../menu/menu.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ MenuService ],
  animations: [
    trigger('showInfo', [
      state('1' , style({ transform: 'rotate(180deg)' })),
      state('0', style({ transform: 'rotate(0deg)' })),
      transition('1 => 0', animate('400ms')),
      transition('0 => 1', animate('400ms'))
    ])
  ]
})
export class HeaderComponent implements OnInit {
  public showHorizontalMenu = true;
  public showInfoContent = false;
  public settings: Settings;
  public menuItems: Array<any>;
  public title: string;

  constructor(private appSettings: AppSettings,
    private menuService: MenuService, private authService: AuthService) {
      this.settings = appSettings.settings;
      this.menuItems = menuService.getHorizontalMenuItems();
  }

  ngOnInit() {
    if (window.innerWidth <= 768) {
      this.showHorizontalMenu = false;
    }
  }

  public closeSubMenus() {
    const menu = document.querySelector('#menu0');
    if (menu) {
      for (let i = 0; i < menu.children.length; i++) {
          const child = menu.children[i].children[1];
          if (child) {
              if (child.classList.contains('show')) {
                child.classList.remove('show');
                menu.children[i].children[0].classList.add('collapsed');
              }
          }
      }
    }
  }

  @HostListener('window:resize')
  public onWindowResize(): void {
     this.showHorizontalMenu = window.innerWidth > 768;
  }

  public logout(): void {
    this.authService.logout();
    location.reload();
  }
}
