import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { IssuingbookComponent } from './issuingbook.component';


describe('IssuingbookComponent', () => {
  let component: IssuingbookComponent;
  let fixture: ComponentFixture<IssuingbookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssuingbookComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IssuingbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
