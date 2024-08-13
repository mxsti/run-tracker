import {Component, Input} from '@angular/core';
import {Workout} from "../model/polar_run";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-run-card',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './run-card.component.html',
  styleUrl: './run-card.component.css'
})
export class RunCardComponent {
  @Input()
  run: Workout | undefined;
}
