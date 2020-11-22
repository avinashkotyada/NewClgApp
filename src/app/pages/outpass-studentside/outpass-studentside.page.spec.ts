import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OutpassStudentsidePage } from './outpass-studentside.page';

describe('OutpassStudentsidePage', () => {
  let component: OutpassStudentsidePage;
  let fixture: ComponentFixture<OutpassStudentsidePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutpassStudentsidePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OutpassStudentsidePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
