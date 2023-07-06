import { Child } from './Child.class';

export class ArrayItem {
  constructor(
    public id: string,
    public int: number,
    public float: number,
    public color: string,
    public child: Child,
  ) {}
}
