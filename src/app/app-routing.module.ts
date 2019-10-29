import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './log-in/log-in.component';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthGuard } from './shared/auth-guard.service';
import { VerificationComponent } from './verification/verification.component';
import { InformationComponent } from './information/information.component';
import { UserManagementComponent } from './home/user-management/user-management.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  // { path: 'home', canActivate: [AuthGuard], component: HomeComponent },
  {
    path: 'home', canActivate: [AuthGuard], component: HomeComponent, children: [
      { path: 'information', component: InformationComponent },
      { path: 'users-management', component: UserManagementComponent }
    ]
  },
  { path: 'log-in', component: LogInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'verification', component: VerificationComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
