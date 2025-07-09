import React, { useEffect, useState } from "react";
import axios from "axios";
import Category from "./Category";

/*
  Bu component;
  - activeCategory ve handleCatChange değerlerini props olarak bu isimlerle almalı
  - https://fakestoreapi.com/products/categories adresindeki kategorileri axios ile almalı
  - Bu kategorileri bir state içinde saklamalı
  - map fonksiyonu ile bu state içindeki kategorileri listelemeli
  - Listelerken kullandığı Category componentına gerekli props'ları aktarmalı (Category componentını inceleyebilirsin)
*/

export default function Sidebar({ activeCategory, handleCatChange }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products/categories")
      .then((res) => setCategories(res.data))
      .catch(() => setCategories([]));
  }, []);

  return (
    <nav>
      <h2>Kategoriler</h2>
      {categories.map((category, index) => (
        <Category
          key={index}
          category={category}
          isActive={category === activeCategory}
          onClick={() => handleCatChange(category)}
        />
      ))}
    </nav>
  );
}
