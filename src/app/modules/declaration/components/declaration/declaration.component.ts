import { Component, OnInit } from '@angular/core';
import { DeclarationService } from '../../services/declaration.service';
import { Declaration } from '../../models/declaration';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleService } from '../../services/role.service';

@Component({
  selector: 'app-declaration',
  templateUrl: './declaration.component.html',
  styleUrls: ['./declaration.component.scss'],
})
export class DeclarationComponent implements OnInit {
  declaration: Declaration;
  declarationId: string;
  roles: string[];
  image: string | ArrayBuffer;
  isImageLoading = false;
  modal = false;
  imageBlob: Blob;

  constructor(
    private declarationService: DeclarationService,
    private roleService: RoleService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  /**
   * @description Creates the form, used in the HTML
   * The form contains three fields, all with `disabled` Validators
   */
  ngOnInit(): void {
    this.route.params.subscribe((params) => (this.declarationId = params['id']));
    this.fetchDeclaration();
    this.getRoles();
  }

  /**
   * @description Changes the boolean `modal` to true
   * This triggers a change in the HTML to show a image
   * full size
   */
  enlargeImage(): void {
    this.modal = true;
  }

  /**
   * @description Changes the boolean `modal` to false
   * This triggers a change in the HTML to show a image
   * normal size
   */
  closeEnlargement(): void {
    this.modal = false;
  }

  /**
   * @description Gets all the roles from the user
   */
  getRoles(): void {
    this.roles = this.roleService.getRoles();
  }

  /**
   * @description Checks whether a user contains
   * the needed role
   *
   * @return boolean
   */
  containsRole(role: string): boolean {
    return this.roles.indexOf(role) >= 0;
  }

  /**
   * @description Fetches declaration by Id
   */
  fetchDeclaration(): void {
    this.declarationService.fetchOneDeclaration(this.declarationId).subscribe((declaration: Declaration) => {
      this.fetchImage(declaration.imageId);
      this.declaration = declaration;
    }, console.error);
  }

  /**
   * @description Fetches image by Id
   */
  fetchImage(imageId): void {
    this.isImageLoading = true;
    this.declarationService.fetchDeclarationImage(imageId).subscribe((image: Blob) => {
      this.imageBlob = image;
      this.createImage(image);
      this.isImageLoading = false;
    }, console.error);
  }

  /**
   * @description Creates image from blob
   */
  createImage(image: Blob): void {
    const reader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        this.image = reader.result;
      },
      false,
    );

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  /**
   * @description Approves the current declaration locally
   */
  approveLocalDeclaration(): void {
    this.declarationService
      .approveLocalDeclaration(this.declaration.instanceId)
      .subscribe(() => this.router.navigate(['declaration/dashboard']), console.error);
  }

  /**
   * @description Approves the current declaration globally
   */
  approveGlobalDeclaration(): void {
    this.declarationService
      .approveGlobalDeclaration(this.declaration.instanceId)
      .subscribe(() => this.router.navigate(['declaration/dashboard']), console.error);
  }

  generatePDF(): void {
    const blob = new Blob([this.imageBlob], { type: 'image/jpeg' });

    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(blob);
      return;
    }
    // TODO
    // const data = window.URL.createObjectURL(blob);
    //
    // const link = document.createElement('a');
    // link.href = data;
    // link.download = `declaration-${this.declaration.employee}-${this.declaration.date}.jpeg`;
    // link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
    //
    // setTimeout(function () {
    //   window.URL.revokeObjectURL(data);
    //   link.remove();
    // }, 100);
  }

  // base64ToArrayBuffer(): Uint8Array {
  //   const binaryString = window.atob(this.image);
  //   const binaryLen = binaryString.length;
  //   const bytes = new Uint8Array(binaryLen);
  //   for (let i = 0; i < binaryLen; i++) {
  //     bytes[i] = binaryString.charCodeAt(i);
  //   }
  //   return bytes;
  // }
}
