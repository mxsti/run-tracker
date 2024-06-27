import {Component, inject, OnInit} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {AuthService} from "./service/auth.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Run Tracker';
  authService = inject(AuthService)

  ngOnInit() {
    this.authService.user$.subscribe((user: any) => {
      if (user) {
        this.authService.currentUserSig.set({
          email: user.email,
          username: user.username,
        })
      } else {
        this.authService.currentUserSig.set(null);
      }
    })
  }
}
