import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-products-header',
  templateUrl: './products-header.component.html'
})
export class ProductsHeaderComponent implements OnInit {

  @Output() columsCountChange = new EventEmitter<number>();

  sort = 'desc';

  itemsCount = 12;

  constructor() { }

  ngOnInit(): void {
  }

  onSortUpdate(newSortmeth: string): void{
    this.sort = newSortmeth;
  }

  onItemsUpdate(newCount: number): void{
    this.itemsCount = newCount;
  }

 onColumnsChange(colsNum: number): void{
    this.columsCountChange.emit(colsNum)
 } 

}
