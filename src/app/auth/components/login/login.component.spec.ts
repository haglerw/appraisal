import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

describe('LoginComponent', () => {
  let loginComponent: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LoginComponent
      ],
      imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(LoginComponent);
      // Create instance of login component
      loginComponent = fixture.componentInstance;
    });
    it(`should have a formTitle 'Church Login'`, async(() => {
      expect(loginComponent.formTitle).toContain('Church Login');
    }));
  }));
});
