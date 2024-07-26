import {Component, Input} from '@angular/core';
import {PolarRun} from "../model/polar_run";

@Component({
  selector: 'app-run-card',
  standalone: true,
  imports: [],
  templateUrl: './run-card.component.html',
  styleUrl: './run-card.component.css'
})
export class RunCardComponent {
  @Input()
  run: PolarRun | undefined;
}
