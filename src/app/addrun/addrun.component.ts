import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "../service/auth.service";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {RunService} from "../service/run.service";

@Component({
  selector: 'app-addrun',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, RouterLinkActive],
  templateUrl: './addrun.component.html',
  styleUrl: './addrun.component.css'
})

export class AddrunComponent {
  authService = inject(AuthService)
  router = inject(Router)
  runService = inject(RunService)
  errorMessage: string | null = null;

  addRunForm = new FormGroup({
    timestamp: new FormControl(''),
    length: new FormControl(0),
    strava: new FormControl(''),
  })

  async onAddrunFormSubmit() {
    const timestamp = this.addRunForm.value.timestamp;
    const length = this.addRunForm.value.length;
    const strava = this.addRunForm.value.strava;

    if (timestamp && length && strava) {
      try {
        await this.runService.createRun(timestamp, length, strava);
        void this.router.navigateByUrl('/');
      } catch (error: any) {
        // duck typing to check if firebase error
        if (error && error.code && error.name) {
          switch (error.code) {
            case "permission-denied":
              this.errorMessage = "Du bist nicht autorisiert Läufe hinzuzufügen, bitte logge dich ein";
              break;
            default:
              this.errorMessage = "Ein Fehler ist aufgetreten";
              break;
          }
        } else {
          this.errorMessage = "Ein Fehler ist aufgetreten";
        }
      }
    } else {
      this.errorMessage = "Es müssen alle Felder gefüllt sein"
    }
  }
}
