import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

export default function WishlistPage() {
    return (
        <div className="container mx-auto px-4 py-32 flex flex-col items-center justify-center text-center">
            <div className="bg-muted p-6 rounded-full mb-6">
                <Heart className="h-12 w-12 text-muted-foreground" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Your Wishlist</h1>
            <p className="text-muted-foreground max-w-md mb-8">
                This feature is currently under development. Soon you'll be able to save your favorite items here!
            </p>
            <Button asChild size="lg">
                <Link href="/shop">Browse Shop</Link>
            </Button>
        </div>
    );
}
