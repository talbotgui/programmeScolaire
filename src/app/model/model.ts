export class Noeud {
  data: any;
  parent: Noeud | undefined;
  constructor(public id: string, public idParent: string, public name: string, public children: Noeud[]) { }

  get libelleComplet(): string {
    let libelle = this.name;
    if (this.parent) {
      libelle = this.parent.libelleComplet + ' > ' + libelle;
    }
    return libelle;
  }
}
