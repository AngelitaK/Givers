import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MigrantPage } from './migrant.page';

describe('MigrantPage', () => {
  let component: MigrantPage;
  let fixture: ComponentFixture<MigrantPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MigrantPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MigrantPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
