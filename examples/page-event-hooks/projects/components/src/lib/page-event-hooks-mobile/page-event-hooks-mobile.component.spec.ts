import { ComponentFixture, TestBed } from "@angular/core/testing";

import { PageEventHooksMobileComponent } from "./page-event-hooks-mobile.component";

describe("PageEventHooksMobileComponent", () => {
  let component: PageEventHooksMobileComponent;
  let fixture: ComponentFixture<PageEventHooksMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageEventHooksMobileComponent ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageEventHooksMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
