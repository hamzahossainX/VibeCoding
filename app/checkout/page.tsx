"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
    const { items, cartTotal, clearCart } = useCart();
    const router = useRouter();
    const [isProcessing, setIsProcessing] = useState(false);

    const handleCheckout = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Create Order logic would go here

        clearCart();
        setIsProcessing(false);
        alert("Order placed successfully! (Mock)");
        router.push("/");
    };

    if (items.length === 0) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <h1 className="text-3xl font-bold mb-4">Checkout</h1>
                <p className="text-muted-foreground mb-8">Your cart is empty.</p>
                <Button asChild>
                    <Link href="/shop">Continue Shopping</Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold mb-8">Checkout</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Shipping Form */}
                <div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Shipping Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form id="checkout-form" onSubmit={handleCheckout} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="firstName">First Name</Label>
                                        <Input id="firstName" required placeholder="John" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="lastName">Last Name</Label>
                                        <Input id="lastName" required placeholder="Doe" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" type="email" required placeholder="john@example.com" />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="address">Address</Label>
                                    <Input id="address" required placeholder="123 Main St" />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="city">City</Label>
                                        <Input id="city" required placeholder="New York" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="postalCode">Postal Code</Label>
                                        <Input id="postalCode" required placeholder="10001" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="country">Country</Label>
                                    <Input id="country" required placeholder="United States" />
                                </div>
                            </form>
                        </CardContent>
                    </Card>

                    <Card className="mt-8">
                        <CardHeader>
                            <CardTitle>Payment Method</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center space-x-2 border p-4 rounded-md bg-zinc-50 dark:bg-zinc-900">
                                    <div className="h-4 w-4 rounded-full border-4 border-primary" />
                                    <span className="font-medium">Credit Card (Stripe Mock)</span>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="cardNumber">Card Number</Label>
                                    <Input id="cardNumber" placeholder="0000 0000 0000 0000" disabled />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="expiry">Expiry</Label>
                                        <Input id="expiry" placeholder="MM/YY" disabled />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="cvc">CVC</Label>
                                        <Input id="cvc" placeholder="123" disabled />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Order Summary */}
                <div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Order Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-4">
                                {items.map((item) => (
                                    <div key={`${item.id}-${item.size}-${item.color}`} className="flex space-x-4">
                                        <div className="relative h-16 w-16 overflow-hidden rounded-md border">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="flex flex-1 justify-between">
                                            <div>
                                                <p className="font-medium text-sm">{item.name}</p>
                                                <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                                                <p className="text-xs text-muted-foreground">Size: {item.size}</p>
                                            </div>
                                            <p className="font-medium text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Separator />
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Subtotal</span>
                                    <span>${cartTotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Shipping</span>
                                    <span>Free</span>
                                </div>
                                <div className="flex justify-between text-base font-bold">
                                    <span>Total</span>
                                    <span>${cartTotal.toFixed(2)}</span>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button
                                type="submit"
                                form="checkout-form"
                                className="w-full"
                                size="lg"
                                disabled={isProcessing}
                            >
                                {isProcessing ? "Processing..." : `Pay $${cartTotal.toFixed(2)}`}
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
}
