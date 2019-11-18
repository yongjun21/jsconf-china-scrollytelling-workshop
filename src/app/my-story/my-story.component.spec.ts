import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyStoryComponent } from './my-story.component';

describe('MyStoryComponent', () => {
  let component: MyStoryComponent;
  let fixture: ComponentFixture<MyStoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyStoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyStoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
