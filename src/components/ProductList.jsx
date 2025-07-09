import React, { useEffect, useState } from "react";
import axios from "axios";
import Product from "./Product";

/*
  Bu component;
  - activeCategory değerini props olarak almalı
  - activeCategory her değiştiğinde https://fakestoreapi.com/products/category/ + activeCategory adresinden kategorinin ürünlerini axios ile almalı (örneğin: https://fakestoreapi.com/products/category/electronics)
  - Aldığı ürünleri bir state içinde saklamalı
  - map fonksiyonu ile bu state içindeki ürünleri listelemeli

  NOT: Map fonksiyonu ile listeleme görevi diğer testleri etkiliyor olabilir. Buna göre, listeleme görevini tamamladıktan sonra birkaç test birden geçebilir.
*/

export default function ProductList({ activeCategory }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!activeCategory) return;

    axios
      .get(`https://fakestoreapi.com/products/category/${activeCategory}`)
      .then((res) => setProducts(res.data))
      .catch(() => setProducts([]));
  }, [activeCategory]);

  return (
    <main className="productList">
      <h2 data-testid="productList-title">{activeCategory} ürünleri</h2>
      {products.map((item) => (
        <Product key={item.id} product={item} />
      ))}
    </main>
  );
}
