import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

type FibMessage = {
  fibType: 'MEMOIZED' | 'RECURSIVE';
  position: number;
}

@Component({
  selector: 'fibonacci-calculator',
  template: `
    <h1>Fibonacci calculator</h1>
    <div>
      <label for="number">Enter the sequence's desired position:</label>
      <input #position name="number" type="number">
    </div>
    <div>
      <button (click)="calculateMemoized()">Calculate with memo</button>
      <button (click)="calculateRecursive()">Calculate recursively</button>
    </div>
    <h3>Result: <span>{{result}}</span></h3>
    <h4>Calculation time: {{time}}</h4>
  `,
  styles: [
  ]
})
export class FibonacciCalculatorComponent implements OnInit {
  @ViewChild('position') positionInput!: ElementRef<HTMLInputElement>;

  fibWorker!: Worker;
  result = '';
  startTime = 0;
  time = '';


  constructor() { }

  ngOnInit(): void {
    if (typeof Worker !== 'undefined') {
      this.fibWorker = new Worker(new URL('./fibonacci-calculator.worker', import.meta.url));

      this.fibWorker.onmessage = ({ data }) => {
        this.time = String(new Date().getTime() - this.startTime) + ' ms';
        this.result = data;
      };

    } else {
      throw new Error('Web workers are not supported in this environment.')
    }
  }

  calculateMemoized() {
    const position = Number(this.positionInput?.nativeElement.value);

    this.startTime = new Date().getTime();
    this.sendToWorker({
      fibType: 'MEMOIZED',
      position
    })
  }

  calculateRecursive() {
    const position = Number(this.positionInput?.nativeElement.value);
    
    this.startTime = new Date().getTime();
    this.sendToWorker({
      fibType: 'RECURSIVE',
      position
    })
  }

  private sendToWorker(msg: FibMessage) {
    this.fibWorker.postMessage(msg);
  }

}
