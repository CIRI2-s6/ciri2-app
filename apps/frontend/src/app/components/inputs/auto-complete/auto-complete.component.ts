import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auto-complete',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './auto-complete.component.html',
})
export class AutoCompleteComponent {
  placeHolder = input('Search');
  options = input<{ key: string; value: string }[]>();
  selected = output<string>();
  query = output<string>();

  isActive = false;

  selectOption(event: Event): void {
    console.log('selectOption');
    const option = (event.target as HTMLInputElement).value;
    console.log(option);
    this.selected.emit(option);
    this.isActive = false;
  }

  search(event: Event): void {
    const query = (event.target as HTMLInputElement).value;
    this.query.emit(query);
  }
}
