import React from 'react';
import { Product } from '../types/Product.type';

export default function ProductCard({product}: {product: Product}) {

  return (
    <a className="product" href={`/products/${product.handle}`}>
      <div>
        <div className="productImage">
          <img src={`${product.image.src}&width=200`} alt={product.title} />
        </div>
        <h3>{product.title}</h3>
      </div>
    </a>
  );
};