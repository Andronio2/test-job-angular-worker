import { Component, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ArrayItem } from 'src/app/classes/ArrayItem.class';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss'],
})
export class BodyComponent {
  @Input() dataArray!: BehaviorSubject<ArrayItem[]>;

  displayedColumns: string[] = ['id', 'int', 'float', 'color' , 'child'];
}
