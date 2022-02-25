import { useEffect, useState } from "react";
import Card from "./Card";
import "./Products.css";

const url =
  "https://fir-project-1b826-default-rtdb.firebaseio.com/products.json/";

// const productDummyData = [
//   {
//     id: "p1",
//     title: "jordan1",
//     price: "20",
//     info: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus, rerum?",
//     image:
//       "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/f0c6bdc2-b8fe-45f7-a76d-ae1bbf30e156/air-jordan-4-retro-shoe.png",
//   },
//   {
//     id: "p2",
//     title: "jordan2",
//     price: "50",
//     info: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus, rerum?",
//     image:
//       "https://www.whatproswear.com/wp-content/uploads/2019/03/IMG_6794-1024x1024.jpg",
//   },
//   {
//     id: "p3",
//     title: "jordan3",
//     price: "60",
//     info: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus, rerum?",
//     image:
//       "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/a3376791-ca4c-4f57-a0d1-8397f812f0bc/air-jordan-11-retro-big-kids-shoes-pGFJjH.png",
//   },
//   {
//     id: "p4",
//     title: "jordan3",
//     price: "83",
//     info: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus, rerum?",
//     image:
//       "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/10f05e6b-910b-4ab2-b48b-b6a7cb08b16c/air-jordan-5-retro-mens-shoes-FxTzH0.png",
//   },
//   {
//     id: "p5",
//     title: "jordan3",
//     price: "64",
//     info: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus, rerum?",
//     image:
//       "https://i.pinimg.com/474x/c1/6f/3c/c16f3cb1e7ffe4f9531d34d97d878647.jpg",
//   },
//   {
//     id: "p6",
//     title: "jordan4",
//     price: "95",
//     info: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus, rerum?",
//     image:
//       "https://i.shgcdn.com/8e6a068e-0baa-485e-92bc-71fa862c424d/-/format/auto/-/preview/3000x3000/-/quality/lighter/",
//   },
// ];

export default function Products() {
  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const res = await fetch(url, {
  //         method: "POST",
  //         body: JSON.stringify(productDummyData),
  //       });
  //       if (!res.ok) throw new Error("failed");
  //     } catch (err) {
  //       alert(err.message);
  //     }
  //   })();
  // }, []);

  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await fetch(url);
        const data = await res.json();
        for (const item of Object.values(data)) setProductData(item);
        setLoading(false);
      } catch (err) {
        alert(err.message);
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="row row-cols-5 justify-content-center">
        {productData.map((item) => {
          return <Card {...item} key={item.id} />;
        })}
      </div>
    </div>
  );
}
