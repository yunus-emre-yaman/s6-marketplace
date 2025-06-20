import Category from "./../components/Category";

/*
  Bu component;
  - activeCategory ve handleCatChange değerlerini props olarak bu isimlerle almalı
  - https://fakestoreapi.com/products/categories adresindeki kategorileri axios ile almalı
  - Bu kategorileri bir state içinde saklamalı
  - map fonksiyonu ile bu state içindeki kategorileri listelemeli
  - Listelerken kullandığı Category componentına gerekli props'ları aktarmalı (Category componentını inceleyebilirsin)
*/

export default function Sidebar() {
  return (
    <nav>
      <h2>Kategoriler</h2>
      {[].map((category, index) => (
        <Category key={index} />
      ))}
    </nav>
  );
}
