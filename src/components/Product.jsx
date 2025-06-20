/* bu dosyayı değiştirmene gerek yok */
export default function Product(props) {
  const { title, price, image, description } = props.product;

  return (
    <div className="product-card" title="product-item">
      <div className="product-header">
        <h3>{title}</h3>
        <p>{price}$</p>
      </div>

      <div className="product-infos">
        <div className="product-img">
          <img src={image} />
        </div>
        <p>{description}</p>
      </div>
    </div>
  );
}
/* bu dosyayı değiştirmene gerek yok */
