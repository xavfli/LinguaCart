import ProductList from '@/components/product/product-list';
import { sampleProducts } from '@/data/products'; // Server component, can directly import

export default function HomePage() {
  // In a real app, products would be fetched from an API
  const products = sampleProducts;

  return (
    <div className="container mx-auto px-4 py-8">
      <ProductList products={products} />
    </div>
  );
}
