import { Component, OnInit } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { log } from 'util';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    private login: string;
    private password: string;

    httpOptions = {
        responseType: 'text/plain',
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'X-Auth-Token': 'test4'
        })
    };

    constructor(
        public nav: NavController,
        public menu: MenuController,
        public http: HttpClient,
        private storage: Storage,
    ) {
    }

    ngOnInit() {
        this.checkAuthStorageData().then((authDataExists) => {
            if (authDataExists) {
                this.navigateToHomePage();
            }
        });
    }

    // Disable navigation on login page
    ionViewWillEnter() {
        this.menu.enable(false);
    }

    async checkAuthStorageData() {
        return Promise.all([
            this.storage.get('username'),
            this.storage.get('token'),
        ]).then((results) => {
            const username = results[0];
            const apiToken = results[1];
            if ( username != null && username !== '' && apiToken != null && apiToken !== '' ) {
                return true;
            } else {
                return false;
            }
        });
    }

    doLogin() {
        this.checkAuthStorageData().then((authDataExists) => {
            if (authDataExists) {
                this.navigateToHomePage();
            } else {
                this.makeRequest();
            }
        });
    }

    makeRequest() {
        this.sendauthDataExists(this.login, this.password).subscribe((authResult) => {
            if (authResult) {
                // console.log(authResult);
                this.storage.set('token', authResult.token);
                this.storage.set('username', authResult.username);
                this.navigateToHomePage();
            } else {
                window.alert('Ошибка: данные не верны.\n' +
                    'Повторите попытку авторизации.');
            }
        });
    }

    sendauthDataExists(login, password) {
        const url = 'https://glass.app/login';
        return this.http.post(
            url,
            JSON.stringify({
                api: true,
                email: login,
                password: password
            }),
            {
                // responseType: 'json',
                headers: new HttpHeaders(
                    {
                        'content-Type': 'application/json',
                        // 'X-Auth-Token': 'test'
                    }
                )
            }
        );
    }

    navigateToHomePage() {
        this.nav.navigateRoot('/home', {animationDirection: 'forward'});
    }

}
