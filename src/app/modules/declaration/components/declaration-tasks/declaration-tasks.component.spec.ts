import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeclarationTasksComponent } from './declaration-tasks.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('DeclarationTasksComponent', () => {
  let component: DeclarationTasksComponent;
  let fixture: ComponentFixture<DeclarationTasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DeclarationTasksComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeclarationTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
