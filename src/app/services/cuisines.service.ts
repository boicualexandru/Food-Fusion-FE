import { Injectable } from '@angular/core';
import { Cuisine } from '../models/cuisine/cuisine';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CuisinesService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Cuisine[]>(environment.apiBaseUrl + '/Cuisines');
    }
}