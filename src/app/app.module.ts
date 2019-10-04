import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './home/header/header.component';
import { FooterComponent } from './home/footer/footer.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LogInComponent } from './log-in/log-in.component';
import { PasswordShowDirective } from './shared/password-show.directive';
import { UserManagementComponent } from './home/user-management/user-management.component';
import { MatDatepickerModule, MatFormFieldModule, MatInputModule, MatNativeDateModule, MatIconModule } from '@angular/material';
import { DataTablesModule } from 'angular-datatables';
import { HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './home/profile/profile.component';
import { FormsModule } from '@angular/forms';
import { AdminHomeComponent } from './home/admin-home/admin-home.component';
import { AdminHeaderComponent } from './home/admin-home/admin-header/admin-header.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { AuthGuard } from './shared/auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    SignUpComponent,
    LogInComponent,
    PasswordShowDirective,
    UserManagementComponent,
    ProfileComponent,
    AdminHomeComponent,
    AdminHeaderComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatIconModule,
    HttpClientModule,
    DataTablesModule,
    FormsModule,
    SweetAlert2Module
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
