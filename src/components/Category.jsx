/* bu dosyayı değiştirmene gerek yok */
export default function Category(props) {
  const { category, isActive, handleCatChange } = props;

  return (
    <div
      className={isActive ? "category-item active" : "category-item"}
      onClick={() => handleCatChange(category)}
      title="category-item"
    >
      {category}
    </div>
  );
}
/* bu dosyayı değiştirmene gerek yok */
