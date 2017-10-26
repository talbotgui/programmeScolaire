import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';

import { HttpClient } from '@angular/common/http';

import * as model from '../model/model';

@Injectable()
export class DataRepository {

    constructor(private http: HttpClient) { }

    chargeDonneesDuCycle(indexDuCycle: number): Promise<void | model.Noeud[]> {
        const url = './assets/donnees/donneesCycle' + indexDuCycle + '.json';
        return this.http.get<model.Noeud[]>(url).toPromise();
    }
}
