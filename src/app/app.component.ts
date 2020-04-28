import { Component, HostListener, OnInit, ViewChild } from '@angular/core';

import { Platform, NavController, IonRouterOutlet, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { Storage } from '@ionic/storage';
import { LoginPage } from './pages/login/login.page';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent {

    pages: any [] = [];

    /* get a reference to the used IonRouterOutlet
    assuming this code is placed in the component
    that hosts the main router outlet, probably app.components */
    @ViewChild(IonRouterOutlet, { static: false }) routerOutlet: IonRouterOutlet;

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private menu: MenuController,
        private router: Router,
        private nav: NavController,
        private storage: Storage,
        private loginPage: LoginPage
    ) {
        this.initializeApp();
    }

    ngOnInit() {
        this.platform.backButton.subscribeWithPriority(0, () => {
            if (this.routerOutlet && this.routerOutlet.canGoBack()) {
                this.routerOutlet.pop();
            } else if (this.router.url === '/login') {
                if (window.confirm('Выйти из приложения?')) {
                    navigator['app'].exitApp();
                }
            }
        });
        this.loginPage.checkAuthStorageData().then((authDataExists) => {
            if (!authDataExists) {
                this.nav.navigateRoot('/login', {animationDirection: 'forward'});
            }
        });
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
            this.pages = [
                {
                    name: 'Главная',
                    icon: 'home-outline',
                    url: '/home'
                },
                {
                    name: 'Профиль',
                    icon: 'person-outline',
                    url: '/profile'
                },
                {
                    name: 'Настройки',
                    icon: 'settings-outline',
                    url: '/settings'
                },
                {
                    name: 'О приложении',
                    icon: 'information-circle-outline',
                    url: '/about'
                },
                {
                    name: 'Логин',
                    icon: 'log-in-outline',
                    url: '/login'
                },
                {
                    name: 'Вкладки',
                    icon: 'copy-outline',
                    url: '/tabs'
                }
            ];
            this.checkTheme();
        });
    }

    checkTheme() {

        this.storage.get('App_Theme').then((val) => {

            // Add or remove the "dark" class based on if the media query matches
            function toggleDarkTheme(shouldAdd) {
                document.body.classList.toggle('dark', shouldAdd);
            }

            if (val === null) {

                // Use matchMedia to check the user preference
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

                toggleDarkTheme(prefersDark.matches);

                // Listen for changes to the prefers-color-scheme media query
                prefersDark.addListener((mediaQuery) => toggleDarkTheme(mediaQuery.matches));
                if (toggleDarkTheme) {
                    this.storage.set('App_Theme', 'dark');
                } else {
                    this.storage.set('App_Theme', '');
                }

            } else if (val === 'dark') {
                toggleDarkTheme(true);
            } else if (val === '') {
                toggleDarkTheme(false);
            }

        });


    }

    openMenu() {
        this.menu.enable(true, 'mainMenu');
        this.menu.open('mainMenu');
    }

    gotoPage(page) {
        this.router.navigate([page.url]);
    }

}
