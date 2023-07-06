import { Component, OnInit } from '@angular/core';
import { IToWorkerMsg } from './types/toWorkerMsg.interface';
import { ArrayItem } from './classes/ArrayItem.class';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'MyAppWebWorker';
  worker: Worker;
  dataArray: ArrayItem[] = [];
  dataArray$ = new BehaviorSubject<ArrayItem[]>([]);

  constructor() {
    this.worker = new Worker(new URL('./app.worker', import.meta.url));
  }

  ngOnInit(): void {
    this.worker.onmessage = ({ data }) => {
      const item = data as ArrayItem;
      this.dataArray.push(item)
      if (this.dataArray.length > 10) {
        this.dataArray.shift()
      }
      this.dataArray$.next(this.dataArray)
      console.table(data);
    };
  }

  sendMessageToWorker(msg: IToWorkerMsg): void {
    this.worker.postMessage(msg);
  }

  public getSettings(event: IToWorkerMsg): void {
    console.log('event', event);
    this.sendMessageToWorker(event);
  }
}
