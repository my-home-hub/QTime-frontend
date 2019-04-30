import { Component, OnInit } from '@angular/core';
import { Declaration } from '../../models/declaration';
import { DeclarationService } from '../../services/declaration.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-declaration-tasks',
  templateUrl: './declaration-tasks.component.html',
  styleUrls: ['./declaration-tasks.component.scss']
})
export class DeclarationTasksComponent implements OnInit {
  dataSource: Declaration[] = [];

  constructor(private declarationService: DeclarationService,
              private router: Router) { }

  ngOnInit() {
    this.fetchDeclarations();
  }

  /**
   * @description Fetches all declarations
   */
  fetchDeclarations() {
    this.declarationService.fetchOpenDeclarations()
      .subscribe((declarations: Declaration[]) => {
        this.dataSource = declarations;
      }, console.error);
  }

  /**
   * @description Navigates to
   * declaration detail page
   */
  navigate(id: number) {
    this.router.navigate([`declaration/${id}`]);
  }
}
