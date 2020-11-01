import { Component, OnInit, ViewEncapsulation, HostListener, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppSettings } from '../app.settings';
import { Settings } from '../app.settings.model';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PagesComponent implements AfterViewInit, OnInit {
    showMenu = false;
    showSetting = false;
    menuOption: string;
    menuTypeOption: string;

    public settings: Settings;
    constructor(public appSettings: AppSettings, public router: Router) {
        this.settings = this.appSettings.settings;
        if (sessionStorage['skin']) {
            this.settings.theme.skin = sessionStorage['skin'];
        }
    }

    ngOnInit() {
        if (window.innerWidth <= 768) {
            this.settings.theme.showMenu = false;
            this.settings.theme.sideChatIsHoverable = false;
        }
        this.showMenu = this.settings.theme.showMenu;
        this.menuOption = this.settings.theme.menu;
        this.menuTypeOption = this.settings.theme.menuType;
    }

    chooseMenu(menu) {
        this.settings.theme.menu = menu;
        this.router.navigate(['/']);
    }

    chooseMenuType(menuType) {
        this.settings.theme.menuType = menuType;
        if (menuType === 'mini') {
            jQuery('.menu-item-link').tooltip('enable');
        } else {
            jQuery('.menu-item-link').tooltip('disable');
        }
    }

    changeTheme(theme) {
        this.settings.theme.skin = theme;
        sessionStorage['skin'] = theme;
    }

    ngAfterViewInit() {
        document.getElementById('preloader').classList.add('hide');
    }

    @HostListener('window:resize')
    onWindowResize(): void {
        const showMenu = !this._showMenu();

        if (this.showMenu !== showMenu) {
            this.showMenuStateChange(showMenu);
        }
        this.showMenu = showMenu;
    }

    showMenuStateChange(showMenu: boolean): void {
        this.settings.theme.showMenu = showMenu;
    }

    private _showMenu(): boolean {
        return window.innerWidth <= 768;
    }

}
