
import PropertyCard from "./PropertyCard.jsx";
import ProductsCarousel from "./ProductCarousel.jsx";

const ComponentMap = {
  "property-card": PropertyCard,
  "products-carousel": ProductsCarousel,
  
} as const;

export default ComponentMap;

