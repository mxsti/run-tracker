import {Component, Input} from '@angular/core';
import {Run} from "../model/run";

@Component({
  selector: 'app-run-card',
  standalone: true,
  imports: [],
  templateUrl: './run-card.component.html',
  styleUrl: './run-card.component.css'
})
export class RunCardComponent {
  @Input()
  run: Run | undefined;
}
