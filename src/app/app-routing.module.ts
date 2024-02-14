import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './components/users/users.component';
import { EventsComponent } from './components/events/events.component';
import { ActivityComponent } from './components/activity/activity.component';

const routes: Routes = [
  { path: 'users', component: UsersComponent},
  { path: 'activity', component: ActivityComponent},
  { path: 'events', component: EventsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
