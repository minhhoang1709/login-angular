import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  routePos: string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.routePos = 'home';
  }

  routeChanges(routePos) {
    this.routePos = routePos;
    console.log(this.routePos);
  }

  logout() {
    this.authService.onLogout();
    this.router.navigate(['/log-in']);
  }
}
