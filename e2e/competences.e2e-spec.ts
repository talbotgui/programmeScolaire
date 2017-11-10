import { protractor } from 'protractor';
import { ProgrammeScolairePage } from './app.po';
import * as selectors from './selectors';
import * as path from 'path';

/**
 * Pour que chaque test soit autonome, chaque test contient un scénario qui redémarre de l'ouverture de la page.
 * Les étapes de préparation du test sont dans la partie Arrange (de Arrange/Act/Assert) si et seulement si ces étapes ont été testées dans un autre test.
 *
 * Pour démarrer le test en DEBUG avec VSCode, il faut lancer "ng serve" depuis un terminal puis ouvrir le script xx.e2e-spec.ts et taper F5
 */
describe('Onglet des compétences', () => {
  let page: ProgrammeScolairePage;

  beforeEach(() => {
    // Accès à l'application
    page = new ProgrammeScolairePage();
    page.navigateToRoot();
  });

  it('Accès à l\'onglet Compétences', () => {
    //
    //
    page.click(selectors.APP.MENU_COMPETENCES);
    //
    expect(page.isVisible(selectors.TabCompetences.CHECKBOX_CHARGEMENT_DONNEES[0])).toBeTruthy();
    expect(page.isVisible(selectors.TabCompetences.CHECKBOX_CHARGEMENT_DONNEES[1])).toBeTruthy();
    expect(page.isVisible(selectors.TabCompetences.CHECKBOX_CHARGEMENT_DONNEES[2])).toBeTruthy();
  });

  it('Chargement des données de la premiere periode', () => {
    //
    page.click(selectors.APP.MENU_COMPETENCES);
    //
    page.click(selectors.TabCompetences.CHECKBOX_CHARGEMENT_DONNEES[0]);
    page.click(selectors.TabCompetences.CHECKBOX_CHARGEMENT_DONNEES[1]);
    page.click(selectors.TabCompetences.CHECKBOX_CHARGEMENT_DONNEES[2]);
    //
    expect(page.isVisible(selectors.TabCompetences.TREE_ROOT)).toBeTruthy();
    expect(page.compterElements(selectors.TabCompetences.TREE_NODES)).toBe(3);
  });

  it('Présence de toutes les compétences sur les premiers niveaux', () => {
    //
    page.click(selectors.APP.MENU_COMPETENCES);
    page.click(selectors.TabCompetences.CHECKBOX_CHARGEMENT_DONNEES[0]);
    page.click(selectors.TabCompetences.CHECKBOX_CHARGEMENT_DONNEES[1]);
    page.click(selectors.TabCompetences.CHECKBOX_CHARGEMENT_DONNEES[2]);
    //
    page.clickAll(selectors.TabCompetences.TREE_NODE_COLLAPSED);
    page.clickAll(selectors.TabCompetences.TREE_NODE_COLLAPSED);
    //
    expect(page.compterElements(selectors.TabCompetences.TREE_NODE_EXPANDED)).toBe(9);
    expect(page.compterElements(selectors.TabCompetences.TREE_NODES)).toBe(52);
    expect(page.compterElements(selectors.TabCompetences.TREE_NODE_COLLAPSED)).toBe(43);
  });

  it('Test du filtre', () => {
    //
    page.click(selectors.APP.MENU_COMPETENCES);
    page.click(selectors.TabCompetences.CHECKBOX_CHARGEMENT_DONNEES[0]);
    page.click(selectors.TabCompetences.CHECKBOX_CHARGEMENT_DONNEES[1]);
    page.click(selectors.TabCompetences.CHECKBOX_CHARGEMENT_DONNEES[2]);
    //
    page.type(selectors.TabCompetences.INPUT_FILTRE, 'Français', protractor.Key.TAB);
    //
    expect(page.compterElements(selectors.TabCompetences.TREE_NODE_EXPANDED)).toBe(40);
    expect(page.compterElements(selectors.TabCompetences.TREE_NODES)).toBe(49);
    expect(page.compterElements(selectors.TabCompetences.TREE_NODE_COLLAPSED)).toBe(9);
  });
});
