import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class TestService {

    httpOptions = {
        responseType: 'text/plain',
        headers: new HttpHeaders({
            'Content-Type':  'application/json',
            'X-Auth-Token': 'test4'
        })
    };

    constructor(
        public http: HttpClient
    ) {
    }

    SaveData(apiToken) {
        const url = 'https://glass.app/api/test';
        return this.http.post(
            url,
            null,
            {
                // responseType: 'json',
                headers: new HttpHeaders(
                    {
                        'content-Type': 'application/json',
                        'X-Auth-Token': apiToken
                    }
                )
            }
        );
    }

}
