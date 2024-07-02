import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CustomTextboxDesktopComponent } from "./custom-textbox-desktop.component";

describe("CustomTextboxDesktopComponent", () => {
  let component: CustomTextboxDesktopComponent;
  let fixture: ComponentFixture<CustomTextboxDesktopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomTextboxDesktopComponent ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomTextboxDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
