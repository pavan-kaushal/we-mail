import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button'
import { UsersComponent } from './components/recipients/recipients.component';
import { ActivityComponent } from './components/activity/activity.component';
import { EventsComponent } from './components/events/events.component';
import { LoginComponent } from './components/authorisation/login/login.component';
import { RouterModule } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './components/authorisation/signup/signup.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthService } from './components/authorisation/auth.service';
import { ToastrModule } from 'ngx-toastr';
import { MatTooltipModule } from '@angular/material/tooltip';
import { JwtInterceptor } from 'src/app/interceptors/jwt.interceptor';
import { UserDialogComponent } from './components/user-identities-dialog/user-identities-dialog.component';
import { ConfirmationPopupComponent } from './components/confirmation-popup/confirmation-popup.component';
import { ResponseInterceptor } from 'src/app/interceptors/response.interceptor';
import { ErrorPopupComponent } from './components/error-popup/error-popup.component';
import { MatExpansionModule } from '@angular/material/expansion'
import { MatSelectModule } from '@angular/material/select';
import { EventScreenComponent } from './components/events/event-screen/event-screen.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    ActivityComponent,
    EventsComponent,
    HomePageComponent,
    LoginComponent,
    SignupComponent,
    UserDialogComponent,
    ConfirmationPopupComponent,
    ErrorPopupComponent,
    EventScreenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    MatDialogModule,
    MatFormFieldModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      maxOpened: 5,
      closeButton: false,
      autoDismiss: true,
    }),
    MatTooltipModule,
    MatExpansionModule,
    MatSelectModule,
    MatCheckboxModule,
    MatMenuModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true },
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

/*
activity page with event params
search pipe
loader service
error interceptor -> DONE
auth guard -> DONE
delete confirmation popup -> DONE
*/
