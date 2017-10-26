import { Component } from '@angular/core';

import { DataRepository } from './service/data.repository';

@Component({ selector: 'app-root', templateUrl: './app.component.html', styleUrls: ['./app.component.css'] })
export class AppComponent {

    rechargerPage() {
        window.location.reload();
    }
}
