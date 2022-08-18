import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FibonacciCalculatorComponent } from './fibonacci-calculator.component';

@NgModule({
  declarations: [FibonacciCalculatorComponent],
  imports: [CommonModule],
  exports: [FibonacciCalculatorComponent]
})
export class FibonacciCalculatorModule {}
