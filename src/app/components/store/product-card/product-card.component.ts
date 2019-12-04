import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styles:[
    'p { height: 50px; }'
  ]
})
export class ProductCardComponent implements OnInit {
  @Input() public product: Product;

  constructor() { }

  ngOnInit() {
  }

}
