import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FundraisingPage } from './fundraising.page';

describe('FundraisingPage', () => {
  let component: FundraisingPage;
  let fixture: ComponentFixture<FundraisingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FundraisingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FundraisingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
