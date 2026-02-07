import { HeroSection } from "@/components/HeroSection";
import { ProductCard, Product } from "@/components/ProductCard";
import { db } from "@/lib/db";

// Mock data for initial render if DB is empty, or fetch from DB
// For valid DB connection, we should fetch. 
// Since this is a server component, we can access prisma directly.

async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const products = await db.product.findMany({
      where: { isFeatured: true },
      take: 4,
    });
    return products.map(p => ({
      ...p,
      images: p.images || [], // Ensure images is an array
      // Prisma might return other fields, we need to map to our Product interface if needed
      // but here it matches mostly.
    }));
  } catch (error) {
    console.error("Failed to fetch products", error);
    return [];
  }
}

async function getNewArrivals(): Promise<Product[]> {
  try {
    const products = await db.product.findMany({
      orderBy: { createdAt: 'desc' },
      take: 4,
    });
    return products.map(p => ({
      ...p,
      images: p.images || [],
    }));
  } catch (error) {
    console.error("Failed to fetch products", error);
    return [];
  }
}

export default async function Home() {
  // Parallel fetching
  const [featuredProducts, newArrivals] = await Promise.all([
    getFeaturedProducts(),
    getNewArrivals()
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />

      {/* Featured Section */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Featured Collection</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.length > 0 ? (
            featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p className="col-span-full text-center text-muted-foreground">No featured products found.</p>
          )}
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="py-16 bg-zinc-50 dark:bg-zinc-900/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">New Arrivals</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {newArrivals.length > 0 ? (
              newArrivals.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <p className="col-span-full text-center text-muted-foreground">No new arrivals found.</p>
            )}
          </div>
        </div>
      </section>

      <footer className="py-10 border-t mt-auto">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2026 Vibe Coding Store. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

