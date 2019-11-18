import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MyHeaderComponent } from './my-header/my-header.component';
import { MyFooterComponent } from './my-footer/my-footer.component';
import { MyStoryComponent } from './my-story/my-story.component';
import { DynamicMapComponent } from './dynamic-map/dynamic-map.component';
import StScrolly from '@st-graphics/angular-scrolly';

@NgModule({
  declarations: [
    AppComponent,
    MyHeaderComponent,
    MyFooterComponent,
    MyStoryComponent,
    DynamicMapComponent,
    StScrolly
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
