import Link from "next/link";

export default function ProductCard(props) {
  const { product } = props;
  console.log(product, "<<<<<<");

  return (
    <>
      <Link href={`/products/${product.slug}`}>
        <div className="card card-compact bg-gray-100 w-auto hover:border border-solid border-black">
          <figure>
            <img
              src="https://images.pexels.com/photos/5976060/pexels-photo-5976060.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
              alt="Shoes"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{product.name}</h2>
            <p>{product.category.name}</p>
            <p>Rp.{product.price}</p>
          </div>
        </div>
      </Link>
    </>
  );
}
