import {inject, Injectable} from '@angular/core';
import {addDoc, collection, collectionData, Firestore, Timestamp} from "@angular/fire/firestore";
import {map, Observable, tap} from "rxjs";
import {Workout} from "../model/polar_run";

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  firestore: Firestore = inject(Firestore);

  // currently not used -> runs are created automatically from polar api
  async createRun(timestamp: string, length: number, strava: string) {
    return addDoc(collection(this.firestore, 'runs'), {
      timestamp: Timestamp.fromDate(new Date(timestamp)),
      length: length,
      strava: strava,
    })
  }

  getWorkouts(): Observable<Workout[]> {
    // reference to the runs collection
    const runsCollection = collection(this.firestore, 'runs_polar');
    return collectionData(runsCollection).pipe(
      // map over runs to create date
      map((runs: Workout[]) => runs.map((run: Workout) => {
        run.date = new Date(run.start_time);
        run.calories = run.calories ? run.calories : 0;
        run.formatted_duration = run.duration ? this.fmtMSS(run.duration) : null;
        return run;
      })),
      // sort by date to show correctly in component
      tap((runs: Workout[]) => runs.sort((a, b) => b.date.getTime() - a.date.getTime()))
    );
  }

  private fmtMSS(s: number){return(s-(s%=60))/60+(9<s?':':':0')+s}
}
