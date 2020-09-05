import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Account2Page } from './account2.page';

describe('Account2Page', () => {
  let component: Account2Page;
  let fixture: ComponentFixture<Account2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Account2Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Account2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
