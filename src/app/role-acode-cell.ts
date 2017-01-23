import { Role } from './role';
import { Acode } from './acode';

// -----------------------------------------------------------------------------

export class Cell {

  constructor() { }

  getText(): string {
    return "";
  }

  getChecked(): boolean {
    return false;
  }

  changed(): void {

  }
}

// -----------------------------------------------------------------------------

export class TextCell extends Cell {

  private text: string;

  constructor(text: string) {
    super();
    this.text = text;
  }

  getText(): string {
    return this.text;
  }
}

// -----------------------------------------------------------------------------

export class RoleCell extends Cell {

  private role: Role;

  constructor(role: Role) {
    super();
    this.role = role;
  }

  getText(): string {
    return this.role.name + " [" + this.role.id + "]";
  }
}

// -----------------------------------------------------------------------------

export class AcodeCell extends Cell {

  private acode: Acode;

  constructor(acode: Acode) {
    super();
    this.acode = acode;
  }

  getText(): string {
    return this.acode.name + " [" + this.acode.id + "]";
  }
}

// -----------------------------------------------------------------------------

export class RoleAcodeCell extends Cell {

  private role_id: number;
  private acode_id: number;
  private checked: boolean;

  constructor(role_id: number, acode_id: number, checked: boolean) {
    super();
    this.role_id = role_id;
    this.acode_id = acode_id;
    this.checked = checked;
  }

  getText(): string {
    if (this.checked) {
      return "+";
    } else {
      return "";
    }
  }

  getChecked(): boolean {
    return this.checked;
  }

  getRoleId(): number {
    return this.role_id;
  }

  getAcodeId(): number {
    return this.acode_id;
  }

  changed(): void {
    this.checked = !this.checked;
  }
}
