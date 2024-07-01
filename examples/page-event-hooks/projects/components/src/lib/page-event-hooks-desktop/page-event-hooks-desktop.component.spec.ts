import { ComponentFixture, TestBed } from "@angular/core/testing";

import { PageEventHooksDesktopComponent } from "./page-event-hooks-desktop.component";

describe("PageEventHooksDesktopComponent", () => {
  let component: PageEventHooksDesktopComponent;
  let fixture: ComponentFixture<PageEventHooksDesktopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageEventHooksDesktopComponent ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageEventHooksDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
