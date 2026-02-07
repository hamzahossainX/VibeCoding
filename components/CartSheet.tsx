"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Trash2, Plus, Minus } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export function CartSheet() {
    const { items, removeItem, updateQuantity, cartTotal, isCartOpen, setIsCartOpen } = useCart();

    return (
        <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                    <ShoppingBag className="h-5 w-5" />
                    {items.length > 0 && (
                        <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-bold text-primary-foreground flex items-center justify-center">
                            {items.reduce((acc, item) => acc + item.quantity, 0)}
                        </span>
                    )}
                </Button>
            </SheetTrigger>
            <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
                <SheetHeader className="px-6 border-b">
                    <SheetTitle>Shopping Cart</SheetTitle>
                </SheetHeader>
                {items.length === 0 ? (
                    <div className="flex flex-1 flex-col items-center justify-center space-y-4">
                        <ShoppingBag className="h-16 w-16 text-muted-foreground" />
                        <p className="text-lg font-medium text-muted-foreground">Your cart is empty</p>
                        <Button onClick={() => setIsCartOpen(false)}>Continue Shopping</Button>
                    </div>
                ) : (
                    <>
                        <ScrollArea className="flex-1 pr-6">
                            <div className="space-y-4 pt-4">
                                {items.map((item) => (
                                    <div key={`${item.id}-${item.size}-${item.color}`} className="flex space-x-4">
                                        <div className="relative h-24 w-24 overflow-hidden rounded-md border">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="flex flex-1 flex-col justify-between">
                                            <div className="flex justify-between space-x-2">
                                                <div>
                                                    <h3 className="line-clamp-1 text-sm font-medium">{item.name}</h3>
                                                    <div className="mt-1 flex text-xs text-muted-foreground">
                                                        {item.size && <span className="mr-2">Size: {item.size}</span>}
                                                        {item.color && (
                                                            <div className="flex items-center">
                                                                Color:
                                                                <span
                                                                    className="ml-1 block h-3 w-3 rounded-full border"
                                                                    style={{ backgroundColor: item.color }}
                                                                />
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <p className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-2 border rounded-md p-1">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-6 w-6"
                                                        onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)}
                                                    >
                                                        <Minus className="h-3 w-3" />
                                                    </Button>
                                                    <span className="text-sm w-4 text-center">{item.quantity}</span>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-6 w-6"
                                                        onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)}
                                                    >
                                                        <Plus className="h-3 w-3" />
                                                    </Button>
                                                </div>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="text-destructive"
                                                    onClick={() => removeItem(item.id, item.size, item.color)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                        <div className="space-y-4 pr-6 pt-4 pb-4">
                            <Separator />
                            <div className="flex items-center justify-between text-base font-medium">
                                <span>Total</span>
                                <span>${cartTotal.toFixed(2)}</span>
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Shipping and taxes calculated at checkout.
                            </p>
                            <div className="grid gap-2">
                                <Button className="w-full" asChild onClick={() => setIsCartOpen(false)}>
                                    <Link href="/checkout">Checkout</Link>
                                </Button>
                                <Button variant="outline" className="w-full" onClick={() => setIsCartOpen(false)}>
                                    Continue Shopping
                                </Button>
                            </div>
                        </div>
                    </>
                )}
            </SheetContent>
        </Sheet>
    );
}
