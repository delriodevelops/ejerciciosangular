import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ChildModule } from './child/child.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, ChildModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
