import { ComponentFixture, TestBed } from "@angular/core/testing";

import { DuplicateToolbarActionComponent } from "./duplicate-toolbar-action.component";

describe("DuplicateToolbarActionComponent", () => {
  let component: DuplicateToolbarActionComponent;
  let fixture: ComponentFixture<DuplicateToolbarActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DuplicateToolbarActionComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DuplicateToolbarActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
