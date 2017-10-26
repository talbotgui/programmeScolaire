import { Injectable } from '@angular/core';

import * as model from '../model/model';

@Injectable()
export class RechercheService {

  /**
   * Compare une expression recherchée avec un libellé de compétence.
   * @param libelle Le libellé de la compétence (en majuscule)
   * @param mots Les mots de l'expression recherchée (en majuscule)
   */
  compareLibellePourRecherche(libelle: string, mots: string[]): boolean {
    let valide = true;
    if (libelle) {
      for (const mot of mots) {
        if (mot.startsWith('-')) {
          valide = valide && libelle.indexOf(mot.substr(1, mot.length - 1)) === -1;
        } else {
          valide = valide && libelle.indexOf(mot) !== -1;
        }
      }
    }
    return valide;
  }

}
