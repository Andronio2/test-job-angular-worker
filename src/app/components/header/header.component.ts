import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  Subject,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  startWith,
  takeUntil,
} from 'rxjs';
import { IToWorkerMsg } from 'src/app/types/toWorkerMsg.interface';

const DEFAULT_TIME = 1000;
const DEFAULT_AMOUNT = 1000;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() inputValues = new EventEmitter<IToWorkerMsg>();

  inputTime = new FormControl(DEFAULT_TIME);
  inputAmount = new FormControl(DEFAULT_AMOUNT);

  destroy$ = new Subject<boolean>();

  ngOnInit(): void {
    const obs1$ = this.inputTime.valueChanges.pipe(startWith(DEFAULT_TIME));
    const obs2$ = this.inputAmount.valueChanges.pipe(startWith(DEFAULT_AMOUNT));
    combineLatest([obs1$, obs2$])
      .pipe(debounceTime(500), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe((mass) => {
        console.log('mass', mass);
        if (mass[0] && mass[1]) {
          this.inputValues.emit({ time: mass[0], amount: mass[1] });
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }
}
