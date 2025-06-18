// import React, { useState } from "react";
// import { PropsUI } from "./interface";
// import PropCard from "./PropCard";

// interface CarouselProps {
//   propsUi: PropsUI[];
// }

// const PropCarouselCard: React.FC<CarouselProps> = ({ propsUi }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const nextCard = () => {
//     setCurrentIndex((prev) => (prev + 1) % propsUi.length);
//   };

//   const prevCard = () => {
//     setCurrentIndex((prev) =>
//       prev === 0 ? propsUi.length - 1 : prev - 1
//     );
//   };

//   return (
//     <div className="relative w-full overflow-hidden">
//       <div
//         className="flex transition-transform duration-500 ease-in-out"
//         style={{
//           transform: `translateX(-${currentIndex * 100}%)`,
//           width: `${propsUi.length * 100}%`,
//         }}
//       >
//         {propsUi.map((prop , idx) => (
//           <div
//             key={prop.id_product}
//             className="w-full flex-shrink-0 px-4"
//             style={{ width: "100%" }}
//           >
//             <PropCard prop={prop as any} />
//           </div>
//         ))}
//       </div>

//       {/* Botones de navegación */}
//       <div className="absolute inset-y-1/2 left-0 flex items-center">
//         <button
//           onClick={prevCard}
//           className="bg-black/30 text-white px-3 py-1 rounded-full ml-2"
//         >
//           ◀
//         </button>
//       </div>
//       <div className="absolute inset-y-1/2 right-0 flex items-center">
//         <button
//           onClick={nextCard}
//           className="bg-black/30 text-white px-3 py-1 rounded-full mr-2"
//         >
//           ▶
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PropCarouselCard;
