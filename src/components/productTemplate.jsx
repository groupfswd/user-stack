// import Image from "next/image";
// import React from "react";
// import AddToWishlistButton from "@/components/addToWishlist";

// const ProductTemplate = () => {
//   const products = [
//     {
//       id: 1,
//       title: "piring bayi",
//       descriptions: "lorem ipsum",
//       url: "https://media.istockphoto.com/id/1327604326/id/foto/produk-bayi-perbelanjaan-bodysuit-sisir-puting-susu-kaus-kaki-teether-latar-belakang-putih.jpg?s=612x612&w=0&k=20&c=xXWTc9Fyo2CAj4Ntr-cc4jezI7KKHKl4V4R66Oq4cPI=",
//       harga: "Rp 25,000",
//     },
//     {
//       id: 2,
//       title: "piring bayi",
//       descriptions: "lorem ipsum",
//       url: "https://plus.unsplash.com/premium_photo-1703389454976-51b37efacd6e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzh8fGJhYmllcyUyMHRveXxlbnwwfDB8MHx8fDE%3D",
//       harga: "Rp 25,000",
//     },
//     {
//       id: 3,
//       title: "piring bayi",
//       descriptions: "lorem ipsum",
//       url: "https://images.unsplash.com/photo-1635874714425-c342060a4c58?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHBhbXBlcnN8ZW58MHx8MHx8fDA%3D",
//       harga: "Rp 25,000",
//     },
//     {
//       id: 1,
//       title: "piring bayi",
//       descriptions: "lorem ipsum",
//       url: "https://images.unsplash.com/photo-1530325553241-4f6e7690cf36?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//       harga: "Rp 25,000",
//     },
//     {
//       id: 2,
//       title: "piring bayi",
//       descriptions: "lorem ipsum",
//       url: "https://plus.unsplash.com/premium_photo-1684355500596-2dd59bc6d5af?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGJhYmllcyUyMHRveXxlbnwwfDB8MHx8fDE%3D",
//       harga: "Rp 25,000",
//     },
//     {
//       id: 3,
//       title: "piring bayi",
//       descriptions: "lorem ipsum",
//       url: "https://plus.unsplash.com/premium_photo-1675183690347-662b2f9f3cf7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmFiaWVzJTIwdG95fGVufDB8MHwwfHx8MQ%3D%3D",
//       harga: "Rp 25,000",
//     },
//     {
//       id: 1,
//       title: "piring bayi",
//       descriptions: "lorem ipsum",
//       url: "https://media.istockphoto.com/id/183367458/photo/three-numbered-building-blocks-on-white-background.webp?b=1&s=170667a&w=0&k=20&c=R-nnkcTH9jNx8JBfnxmv4SBGdWvjH80pqy002o4Rjlc=",
//       harga: "Rp 25,000",
//     },
//     {
//       id: 2,
//       title: "piring bayi",
//       descriptions: "lorem ipsum",
//       url: "https://plus.unsplash.com/premium_photo-1675183691244-1fc0359fa1f6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGJhYmllcyUyMHRveXxlbnwwfDB8MHx8fDE%3D",
//       harga: "Rp 25,000",
//     },
//   ];

//   return (
//     <div>
//       <div className=" grid sm:grid-cols-4 text-center items-center gap-y-10 py-10">
//         {products.map((product) => (
//           <div key={product.id} className="flex flex-col items-center p-4">
//             <div className="items-center">
//               <h2 className="font-semibold text-3xl py-10">{product.title}</h2>
//               <Image
//                 className="items-center rounded-lg"
//                 src={product.url}
//                 width={300}
//                 height={200}
//               />
//               <h3 className="text-2xl px-10 py-10">{product.descriptions}</h3>
//               <p className="font-semibold px-10 py-10">{product.harga}</p>
//               <AddToWishlistButton />
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProductTemplate;
