import {inject, Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  fireauth: AngularFireAuth = inject(AngularFireAuth);

  constructor() { }

  login(email: string, password:string){
    this.fireauth.signInWithEmailAndPassword(email,password)
      .then(res => res.user);
  }
}
