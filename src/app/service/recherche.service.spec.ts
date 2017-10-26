import { MdSnackBar } from '@angular/material';
import * as mockito from 'ts-mockito';

import * as model from '../model/model';
import { DataRepository } from '../service/data.repository';
import { RechercheService } from '../service/recherche.service';

describe('RechercheService', () => {

  let rechercheService: RechercheService;

  // Pour réinitialiser le composant de test avant chaque test
  beforeEach(() => {
    rechercheService = new RechercheService();
  });

  it('Cas simple', () => {
    expect(rechercheService.compareLibellePourRecherche('bonjour les amis', ['amis'])).toBe(true);
  });

  it('Cas multiple', () => {
    expect(rechercheService.compareLibellePourRecherche('bonjour les amis', ['amis', 'les'])).toBe(true);
  });

});
