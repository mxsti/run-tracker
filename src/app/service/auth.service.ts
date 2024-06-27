import {inject, Injectable, signal} from '@angular/core';
import {Auth, signInWithEmailAndPassword, signOut, user} from "@angular/fire/auth"
import {from, Observable} from "rxjs";
import {User} from "../model/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  fireauth: Auth = inject(Auth);
  user$ = user(this.fireauth);
  currentUserSig = signal<User | null | undefined>(undefined);

  login(email: string, password: string): Observable<void> {
    const promise = signInWithEmailAndPassword(this.fireauth, email, password).then(() => {});
    return from(promise);
  }

  logout(): Observable<void> {
    return from(signOut(this.fireauth));
  }
}
