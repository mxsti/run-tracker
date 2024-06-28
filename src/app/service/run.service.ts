import {inject, Injectable} from '@angular/core';
import {addDoc, collection, collectionData, Firestore, Timestamp} from "@angular/fire/firestore";
import {Run} from "../model/run";
import {map, Observable, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RunService {
  firestore: Firestore = inject(Firestore);

  getRuns(): Observable<Run[]> {
    // reference to the runs collection
    const runsCollection = collection(this.firestore, 'runs');

    return collectionData(runsCollection).pipe(
      // map over runs to create correct date field
      map((runs: Run[]) => runs.map((run: Run) => {
        run.date = new Date(run.timestamp.seconds * 1000);
        return run;
      })),
      // sort by date to show correctly in component
      tap((runs: Run[]) => runs.sort((a, b) => b.date.getTime() - a.date.getTime()))
    );
  };

  async createRun(timestamp: string, length: number, strava: string) {
    return addDoc(collection(this.firestore, 'runs'), {
      timestamp: Timestamp.fromDate(new Date(timestamp)),
      length: length,
      strava: strava,
    })
  }
}
