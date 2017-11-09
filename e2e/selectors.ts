import { by } from 'protractor';

export class APP {
  static TITLE = by.css('app-root h1');
  static MENU_COMPETENCES = by.css('a.navCompetence');
  static MENU_ELEVES = by.css('a.navEleve');
  static MENU_TDB = by.css('a.navTdb');
  static MENU_JOURNAL = by.css('a.navJournal');
  static MENU_TACHES = by.css('a.navTaches');
}

export class TabCompetences {
  static CHECKBOX_CHARGEMENT_DONNEES = [
    by.xpath('//input[@type="checkbox"][1]'),
    by.xpath('//input[@type="checkbox"][2]'),
    by.xpath('//input[@type="checkbox"][3]')
  ];
  static INPUT_FILTRE = by.xpath('//tab-competence/fieldset/input');
  static TREE_ROOT = by.xpath('//tree-root');
  static TREE_NODES = by.css('span.toggle-children');
  static TREE_NODE_COLLAPSED = by.css('span.toggle-children-wrapper-collapsed');
  static TREE_NODE_EXPANDED = by.css('span.toggle-children-wrapper-expanded');
}

