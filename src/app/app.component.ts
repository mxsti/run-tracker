import {Component, inject} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {RunCardComponent} from "./run-card/run-card.component";
import {AsyncPipe, NgFor, NgIf} from "@angular/common";
import {Run} from "./model/run";
import {RunService} from "./service/run.service";
import {map, Observable} from "rxjs";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RunCardComponent, AsyncPipe, NgFor, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  runService = inject(RunService)
  runs$: Observable<Run[]>;
  totalLength$: Observable<string>; // string because we call toFixed
  averageDistance$: Observable<number>; // string because we call toFixed
  title = "Run Tracker";

  constructor() {
    this.runs$ = this.runService.getRuns();
    this.totalLength$ = this.runs$.pipe(
      map((runs: Run[]) => runs.reduce((total, run: Run) => total + run.length, 0).toFixed(2))
    );
    this.averageDistance$ = this.runs$.pipe(
      map((runs: Run[]) => runs.reduce((total, run: Run) => total + run.length, 0) / runs.length)
    );
  }
}
