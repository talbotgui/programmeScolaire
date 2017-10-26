// Les modules Angular importés
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MdButtonModule, MdCheckboxModule, MdSnackBarModule, MdTooltipModule } from '@angular/material';
import { MdNativeDateModule, MD_PLACEHOLDER_GLOBAL_OPTIONS, DateAdapter } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TreeModule } from 'angular-tree-component';

// Tous les composants applicatifs de l'application
import { AppComponent } from './app.component';
import { TabAideComponent } from './tab-aide/tab-aide.component';
import { TabCompetenceComponent } from './tab-competence/tab-competence.component';

// Les composants injectables
import { DataRepository } from './service/data.repository';
import { RechercheService } from './service/recherche.service';

// Le composant contenant les routes
import { AppRoutingModule } from './app-routing.module';

// Déclaration du module
@NgModule({

  // Le composant principal
  bootstrap: [AppComponent],

  // Tous les composants applicatifs de l'application
  declarations: [AppComponent, TabAideComponent, TabCompetenceComponent],

  // Tous les composants à afficher dans un Dialog
  entryComponents: [],

  providers: [
    // Paramétrage global
    { provide: LOCALE_ID, useValue: 'fr-FR' },
    { provide: MD_PLACEHOLDER_GLOBAL_OPTIONS, useValue: { float: 'never' } },

    // Les composants injectables
    DataRepository, RechercheService

  ],

  // Les modules importés
  imports: [

    // Des modules classiques
    BrowserModule, FormsModule, HttpClientModule,

    // Les modules Material
    BrowserAnimationsModule, MdButtonModule, MdCheckboxModule, MdNativeDateModule, MdSnackBarModule, MdTooltipModule,

    // les composants WEB riches externes
    TreeModule,

    // Déclaration des routes
    AppRoutingModule
  ]
})
export class AppModule { }
