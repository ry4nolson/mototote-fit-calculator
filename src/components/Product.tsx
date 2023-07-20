import React from "react";
import { Product } from "../types/Product.type";

export default function ProductCard({ product }: { product: Product }) {
  //m3 motorcycle hitch carrier
  //sport motorcycle hitch carrier
  //extract model from title with regex

  const model = product.title.replace(/motorcycle hitch carrier/i, "");

  return (
    <div className="product product-grid-item">
      <div className="product-grid-item__inner">
        <div className="productImage product-grid-item__image">
          <a
            target="_blank"
            href={`https://www.mototote.com/products/${product.handle}`}
          >
            <img src={`${product.image.src}&width=300`} alt={product.title} />
          </a>
        </div>
        <div className=" product-grid-item__info product-grid-item__info--inline">
          <div className="product-grid-item__info-content">
            <div className="custom_name">
              <span className="custom_title  show_rectangle_box ">{model}</span>
            </div>

            <div className="product-grid-item__title">
              Motorcycle Hitch Carrier
            </div>
          </div>
          <p className="product-cutline" style={{ color: " var(--text)" }}></p>
          <a
            className="product-grid-item__price price"
            target="_blank"
            href={`https://www.mototote.com/products/${product.handle}`}
          >
            ${product.variants[0].price} USD
          </a>

          <a
            className="shop_now_btn"
            target="_blank"
            href={`https://www.mototote.com/products/${product.handle}`}
          >
            Shop Now
          </a>
        </div>
      </div>
    </div>
  );
}
