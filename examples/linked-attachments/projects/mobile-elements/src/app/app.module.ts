import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { MobileComponentsAppModule } from "../../../components/src/mobile-app.module";

@NgModule({
    imports: [BrowserModule, MobileComponentsAppModule],
    providers: []
})
export class AppModule {
    ngDoBootstrap() {}
}
