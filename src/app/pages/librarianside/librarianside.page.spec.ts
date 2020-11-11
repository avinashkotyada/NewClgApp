import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LibrariansidePage } from './librarianside.page';

describe('LibrariansidePage', () => {
  let component: LibrariansidePage;
  let fixture: ComponentFixture<LibrariansidePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LibrariansidePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LibrariansidePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
