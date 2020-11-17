import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LibrarystudentsidePage } from './librarystudentside.page';

describe('LibrarystudentsidePage', () => {
  let component: LibrarystudentsidePage;
  let fixture: ComponentFixture<LibrarystudentsidePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LibrarystudentsidePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LibrarystudentsidePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
