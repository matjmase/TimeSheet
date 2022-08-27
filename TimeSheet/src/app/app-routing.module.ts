import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClockingComponent } from './clocking/clocking.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
  },
  {
    path: 'clocking',
    component: ClockingComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
