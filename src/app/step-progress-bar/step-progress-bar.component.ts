import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-step-progress-bar',
  templateUrl: './step-progress-bar.component.html',
  styleUrls: ['./step-progress-bar.component.scss']
})
export class StepProgressBarComponent implements OnInit {

  @Input()
  step: number;

  constructor() { }

  ngOnInit() {
  }

}
