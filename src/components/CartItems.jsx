import { deleteCartItem } from "@/fetch/cart";

export default function CartItem(params) {
  const cart_item = params.item;

  async function handleDelete() {
    deleteCartItem(cart_item.id);
    window.location.reload();
  }

  return (
    <div>
      <div className="card card-side bg-base-100 shadow-xl">
        <figure>
          <img
            src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg"
            alt="Movie"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{cart_item.product.name}</h2>
          <p>SKU : {cart_item.product.sku}</p>
          <p>Price : {cart_item.product.price}</p>
          <p>Quantity : {cart_item.quantity}</p>
          <p>Sub Total : {cart_item.price * cart_item.quantity}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-error" onClick={handleDelete}>
              delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
