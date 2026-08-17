import { Component, input } from '@angular/core';

@Component({
  selector: 'step-card',
  imports: [],
  templateUrl: './step-card.html',
})
export class StepCard {
  step = input.required<string>();
  title = input.required<string>();
  description = input.required<string>();
}
