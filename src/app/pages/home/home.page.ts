import { Component } from '@angular/core';

import { MenuController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { TestService } from '../../api/test.service';
import { Storage } from '@ionic/storage';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {

    public text: string;
    public data: string;

    dataFromService: any;

    constructor(
        private menu: MenuController,
        private http: HttpClient,
        private TestService: TestService,
        private storage: Storage,
    ) {
        this.text = 'Default starting text';
        this.data = '';
    }

    // Enable navigation
    ionViewWillEnter() {
        this.menu.enable(true);
    }

    onChangeText() {
        this.text = 'Changed!';
    }

    loadData() {

        this.storage.get('token').then((token) => {
            this.TestService.SaveData(token).subscribe(
                (response) => {
                    this.data = JSON.stringify(response);
                }
            );
        })

    }

    clearData() {
        this.data = '';
    }

}
