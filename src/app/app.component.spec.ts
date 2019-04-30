import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {AuthenticationLibModule} from 'login';
import {DeclarationLibModule} from 'declaration-lib';
import {NavigationModule} from './modules/navigation/navigation.module';
import {RouterTestingModule} from '@angular/router/testing';
import {AppRoutingModule} from './app-routing.module';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        AuthenticationLibModule,
        DeclarationLibModule,
        RouterTestingModule,
        NavigationModule,
        AppRoutingModule
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
