import {Component, inject} from '@angular/core';
import {RunService} from "../service/run.service";
import {map, Observable} from "rxjs";
import {Run} from "../model/run";
import {RunCardComponent} from "../run-card/run-card.component";
import {AsyncPipe, NgFor, NgIf} from "@angular/common";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RunCardComponent, AsyncPipe, NgFor, NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  runService = inject(RunService)
  runs$: Observable<Run[]>;
  totalLength$: Observable<string>; // string because we call toFixed
  averageDistance$: Observable<number>; // string because we call toFixed

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
