import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CustomTextboxMobileComponent } from "./custom-textbox-mobile.component";

describe("CustomTextboxMobileComponent", () => {
  let component: CustomTextboxMobileComponent;
  let fixture: ComponentFixture<CustomTextboxMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomTextboxMobileComponent ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomTextboxMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
