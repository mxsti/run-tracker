import {Component, inject} from '@angular/core';
import {WorkoutService} from "../service/workout.service";
import {map, Observable} from "rxjs";
import {RunCardComponent} from "../run-card/run-card.component";
import {AsyncPipe, NgFor, NgIf, NgOptimizedImage} from "@angular/common";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {AuthService} from "../service/auth.service";
import {Workout} from "../model/polar_run";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RunCardComponent, AsyncPipe, NgFor, NgIf, RouterLinkActive, RouterLink, NgOptimizedImage],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  workoutService = inject(WorkoutService);
  authService = inject(AuthService);
  workouts$: Observable<Workout[]>;
  runs$: Observable<Workout[]>;
  rides$: Observable<Workout[]>;
  runTotal$: Observable<string>; // string because we call toFixed
  rideTotal$: Observable<string>; // string because we call toFixed
  averageRunDistance$: Observable<number>;
  averageRideDistance$: Observable<number>;

  constructor() {
    this.workouts$ = this.workoutService.getWorkouts();

    /*
    runs
     */
    this.runs$ = this.workouts$.pipe(
      map((workouts: Workout[]) => workouts.filter((workout:Workout) => workout.type === "run"))
    );
    this.runTotal$ = this.runs$.pipe(
      map((runs: Workout[]) => runs.reduce((total, run: Workout) => total + run.distance / 1000, 0).toFixed(2))
    );
    this.averageRunDistance$ = this.workouts$.pipe(
      map((runs: Workout[]) => runs.reduce((total, run: Workout) => total + run.distance / 1000, 0) / runs.length)
    );

    /*
    rides
     */
    this.rides$ = this.workouts$.pipe(
      map((workouts: Workout[]) => workouts.filter((workout:Workout) => workout.type === "ride"))
    );
    this.rideTotal$ = this.rides$.pipe(
      map((runs: Workout[]) => runs.reduce((total, run: Workout) => total + run.distance / 1000, 0).toFixed(2))
    );
    this.averageRideDistance$ = this.rides$.pipe(
      map((runs: Workout[]) => runs.reduce((total, run: Workout) => total + run.distance / 1000, 0) / runs.length)
    );
  }
}
