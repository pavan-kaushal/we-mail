import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './components/recipients/recipients.component';
import { EventsComponent } from './components/events/events.component';
import { ActivityComponent } from './components/activity/activity.component';
import { LoginComponent } from './components/authorisation/login/login.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { SignupComponent } from './components/authorisation/signup/signup.component';
import { AuthGuard } from './route-guards/auth.guard';
import { EventScreenComponent } from './components/events/event-screen/event-screen.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { 
    path: 'home', 
    component:  HomePageComponent, 
    canActivate: [AuthGuard],
    children: [
      { path: 'users', component: UsersComponent, canActivate: [AuthGuard]},
      { path: 'activity', component: ActivityComponent, canActivate: [AuthGuard]},
      { 
        path: 'events', 
        component: EventsComponent, 
        canActivate: [AuthGuard],
      },
      { path: 'events/event', component: EventScreenComponent, canActivate: [AuthGuard]}
  ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
