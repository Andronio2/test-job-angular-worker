/// <reference lib="webworker" />

import { ArrayItem } from './classes/ArrayItem.class';
import { Child } from './classes/Child.class';
import { IToWorkerMsg } from './types/toWorkerMsg.interface';

let timer: any | null = null;
let count = 0;

addEventListener('message', ({ data }) => {
  const { time, amount } = { ...(data as IToWorkerMsg) };
  if (timer) {
    clearInterval(timer);
  }
  timer = setInterval(() => {
    if (++count >= amount) {
      clearInterval(timer);
      count = 0
    }
    const id = count.toString();
    const int = Math.floor(Math.random() * 10000);
    const float = Math.random() * 100;
    const color = randomColor();
    const child = new Child(
      Math.floor(Math.random() * 1000).toString(),
      randomColor(),
    );
    const newItem = new ArrayItem(id, int, float, color, child);
    postMessage(newItem);
  }, time);
});

function randomColor(): string {
  const colors = [
    'red',
    'cyan',
    'blue',
    'darkblue',
    'lightblue',
    'purple',
    'yellow',
    'lime',
    'magenta',
    'pink',
    'silver',
    'black',
    'orange',
    'brown',
    'maroon',
    'green',
    'olive',
    'aquamarine',
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}
