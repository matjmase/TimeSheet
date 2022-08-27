import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { ClockingComponent } from './clocking/clocking.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AddOrEditEventComponent } from './modal/add-or-edit-event/add-or-edit-event.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ClockingComponent,
    NavBarComponent,
    AddOrEditEventComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, NgbModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
