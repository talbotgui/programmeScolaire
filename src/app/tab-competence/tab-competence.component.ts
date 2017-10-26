import { Component, ViewChild } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { TreeComponent } from 'angular-tree-component';
import { HttpErrorResponse } from '@angular/common/http';

import * as model from '../model/model';
import { DataRepository } from '../service/data.repository';
import { RechecheService } from '../service/recherche.service';

@Component({ selector: 'tab-competence', templateUrl: './tab-competence.component.html', styleUrls: ['./tab-competence.component.css'] })
export class TabCompetenceComponent {

  // Noeud sélectionné
  noeudSelectionne: model.Noeud | undefined;

  // Cycles sélectionnés
  cyclesSelectionnes: number[] = [];

  // Noeuds à afficher
  noeuds: model.Noeud[] = [];

  // Filtre de recherche dans l'arbre
  private tmpfiltre: string;
  private motsDuFiltre: string[];

  set filtre(valeur: string) {
    this.tmpfiltre = valeur;
    if (valeur) {
      this.motsDuFiltre = valeur.toUpperCase().split(' ');
    }
  }
  get filtre() {
    return this.tmpfiltre;
  }

  // Instance de l'abre
  @ViewChild(TreeComponent)
  private tree: TreeComponent;

  // Un constructeur pour se faire injecter les dépendances
  constructor(private rechercheService: RechecheService, private dataRepository: DataRepository, private snackBar: MdSnackBar) { }

  recherche(): void {
    if (this.motsDuFiltre && this.motsDuFiltre[0].length > 3) {
      this.tree.treeModel.filterNodes(
        (node: model.Noeud) => {
          let resultat = true;
          if (this.motsDuFiltre && this.motsDuFiltre[0].length > 3 && node.data.name) {
            resultat = this.rechercheService.compareLibellePourRecherche(node.data.name.toUpperCase(), this.motsDuFiltre);
          }
          return resultat;
        }
      );
    }
  }

  chargeOuDecharge(indexDuCycle: number): void {
    if (this.cyclesSelectionnes.indexOf(indexDuCycle) === -1) {
      this.charge(indexDuCycle);
    } else {
      this.decharge(indexDuCycle);
    }
  }

  selectionneNoeud(noeud: model.Noeud): void {
    this.noeudSelectionne = noeud;
  }

  private decharge(indexDuCycle: number): void {

    // Suppression du noeud
    const anciensElement = this.noeuds;
    this.noeuds = [];
    anciensElement.forEach((noeud) => {
      if (noeud.id !== 'cycle' + indexDuCycle) {
        this.noeuds.push(noeud);
      }
    });

    // Changement du flag
    this.cyclesSelectionnes.splice(this.cyclesSelectionnes.indexOf(indexDuCycle), 1);
  }

  private charge(indexDuCycle: number): void {
    this.dataRepository.chargeDonneesDuCycle(indexDuCycle)
      .then((data: model.Noeud[]) => {

        // Ajoute le lien vers le parent
        const nouveauNoeud = this.completeNoeuds(undefined, data);

        // Sauvegarde de l'instance dans le service DataService
        this.noeuds = this.noeuds.concat(nouveauNoeud);

        // notification
        const message = 'Données du cycle ' + indexDuCycle + ' chargées';
        this.snackBar.open(message, undefined, { duration: 3000 });

        // Changement du flag
        this.cyclesSelectionnes.push(indexDuCycle);
      })
      .catch((error: HttpErrorResponse) => {
        const message = 'Erreur durant le chargement des données du cycle ' + indexDuCycle + ' : ' + error.status + ', message=' + error.message + '}';
        this.snackBar.open(message, undefined, { duration: 3000, extraClasses: ['erreur'] });
      });
  }

  /**
   * Méthode initialisant l'attribut 'parent' et recréant les instances pour en faire de véritable model.Noeud et non des structures de données JSON pures.
   * @param parent Le parent
   * @param data  La liste d'enfants
   */
  private completeNoeuds(parent: model.Noeud | undefined, data: model.Noeud[]): model.Noeud[] {
    const nouveauxNoeuds: model.Noeud[] = [];
    if (data) {
      for (const n of data) {
        const nouveauNoeud = new model.Noeud(n.id, n.idParent, n.name, []);
        nouveauNoeud.parent = parent;
        nouveauNoeud.children = this.completeNoeuds(nouveauNoeud, n.children);
        nouveauxNoeuds.push(nouveauNoeud);
      }
    }
    return nouveauxNoeuds;
  }
}
