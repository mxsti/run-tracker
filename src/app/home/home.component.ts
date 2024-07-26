import {Component, inject} from '@angular/core';
import {RunService} from "../service/run.service";
import {map, Observable} from "rxjs";
import {RunCardComponent} from "../run-card/run-card.component";
import {AsyncPipe, NgFor, NgIf} from "@angular/common";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {AuthService} from "../service/auth.service";
import {PolarRun} from "../model/polar_run";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RunCardComponent, AsyncPipe, NgFor, NgIf, RouterLinkActive, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  runService = inject(RunService);
  authService = inject(AuthService);
  runs$: Observable<PolarRun[]>;
  totalLength$: Observable<string>; // string because we call toFixed
  averageDistance$: Observable<number>; // string because we call toFixed

  constructor() {
    this.runs$ = this.runService.getPolarRuns();
    this.totalLength$ = this.runs$.pipe(
      map((runs: PolarRun[]) => runs.reduce((total, run: PolarRun) => total + run.distance / 1000, 0).toFixed(2))
    );
    this.averageDistance$ = this.runs$.pipe(
      map((runs: PolarRun[]) => runs.reduce((total, run: PolarRun) => total + run.distance / 1000, 0) / runs.length)
    );
  }
}
