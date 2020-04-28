import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.page.html',
    styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

    toggle: any;
    prefersDark: any;

    constructor(
        private storage: Storage,
        private splashScreen: SplashScreen
    ) {

    }

    ngOnInit() {
        this.checkThemeSelector();
    }

    checkThemeSelector() {
        this.storage.get('App_Theme').then((val) => {

            this.toggle = document.querySelector('#themeToggle');

            if (val === null) {
                this.prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
            } else if (val === 'dark') {
                this.prefersDark = true;
            } else if (val === '') {
                this.prefersDark = false;
            }

            this.toggle.checked = this.prefersDark;

        });
    }

    updateTheme(e) {
        document.body.classList.toggle('dark', e.detail.checked);
        if (e.detail.checked) {
            this.storage.set('App_Theme', 'dark');
        } else {
            this.storage.set('App_Theme', '');
        }
    }

    clearStorage() {
        if (window.confirm('Вы уверены, что хотите очистить хранилище данных?\n' +
            'Это удалит все внутренние данные, включая логины и пароли.\n' +
            'Также приложение будет перезапущено для очистки временных данных.')) {
            this.storage.clear()
                .then(() => {
                    window.alert('Хранилище данных было успешно очищено!\n' +
                        'Приложение будет перезапущено.');
                    const initialHref = window.location.href;
                    this.splashScreen.show();
                    // Reload original app url (ie your index.html file)
                    window.location.href = initialHref;
                    this.splashScreen.hide();
                });
        }
    }

}
