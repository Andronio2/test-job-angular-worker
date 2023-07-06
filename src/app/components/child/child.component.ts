import { Component, Input } from '@angular/core';
import { Child } from 'src/app/classes/Child.class';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss'],
})
export class ChildComponent {
  @Input() child!: Child;

  displayedColumns: string[] = ['id',  'color'];
}
