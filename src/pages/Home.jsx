import { useEffect, useState } from "react";
import Products from "../components/Product/Products";
import Carousel from "../components/UI/Carousel";

// const sildebarData = [
//   {
//     id: "s1",
//     image:
//       "https://swingofthingssportsdotcom.files.wordpress.com/2020/05/jordan-shoes-1.jpg",
//     active: false,
//   },
//   {
//     id: "s2",
//     image: "https://i.ytimg.com/vi/cXeQJBghvRw/maxresdefault.jpg",
//     active: false,
//   },
//   {
//     id: "s4",
//     image:
//       "https://media.architecturaldigest.com/photos/57a11cbeb6c434ab487bc26b/2:1/w_1077,h_538,c_limit/nikes-senior-designer-explains-what-went-into-new-air-jordan-01.png",
//     active: true,
//   },
//   {
//     id: "s3",
//     image:
//       "https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fwp-content%2Fblogs.dir%2F6%2Ffiles%2F2021%2F07%2Fnike-air-jordan-1-aj1-high-womens-sneakers-atmosphere-pink-black-white-first-look-release-info-0.jpg?w=960&cbr=1&q=90&fit=max",
//     active: false,
//   },
// ];

export default function Home() {
  const [slideImage, setSlideImage] = useState([]);
  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const res = await fetch(
  //         "https://fir-project-1b826-default-rtdb.firebaseio.com/slidebar.json",
  //         {
  //           method: "POST",
  //           body: JSON.stringify(sildebarData),
  //         }
  //       );
  //       if (!res.ok) throw new Error("failed to get data from database");
  //     } catch (err) {
  //       alert(err.message);
  //     }
  //   })();
  // }, []);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          "https://fir-project-1b826-default-rtdb.firebaseio.com/slidebar.json"
        );
        const data = await res.json();
        for (const item of Object.values(data)) setSlideImage(item);
        if (!res.ok) throw new Error("failed to get data from database");
      } catch (err) {
        alert(err.message);
      }
    })();
  }, []);

  return (
    <div className="container">
      <Carousel data={slideImage} />
      <Products />
    </div>
  );
}
