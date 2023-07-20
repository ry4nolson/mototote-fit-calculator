import React from 'react';
import { Product } from '../types/Product.type';

export default function ProductCard({product}: {product: Product}) {

  return (
    <a className="product product-grid-item" href={`/products/${product.handle}`}>
      <div className="product-grid-item__inner">
        <div className="productImage product-grid-item__image">
          <img src={`${product.image.src}&width=200`} alt={product.title} />
        </div>
        <div className="custom_item__info">
        <h3>{product.title}</h3>
        </div>
      </div>
    </a>
  );
};