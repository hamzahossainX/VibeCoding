"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Heart, Menu, Search } from "lucide-react";
import { CartSheet } from "./CartSheet";
import { UserButton } from "@/components/auth/user-button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

interface NavbarProps {
    user?: {
        name?: string | null;
        email?: string | null;
        image?: string | null;
    };
}

export function Navbar({ user }: NavbarProps) {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const routes = [
        {
            href: "/",
            label: "Home",
            active: pathname === "/",
        },
        {
            href: "/shop",
            label: "Shop",
            active: pathname === "/shop" || pathname.startsWith("/shop/"),
        },
    ];

    return (
        <div className="border-b sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">

                    {/* Mobile Menu */}
                    <div className="flex items-center md:hidden">
                        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <Menu className="h-6 w-6" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                                <nav className="flex flex-col gap-4 mt-8">
                                    {routes.map((route) => (
                                        <Link
                                            key={route.href}
                                            href={route.href}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className={cn(
                                                "text-lg font-medium transition-colors hover:text-primary",
                                                route.active ? "text-black dark:text-white" : "text-muted-foreground"
                                            )}
                                        >
                                            {route.label}
                                        </Link>
                                    ))}
                                </nav>
                            </SheetContent>
                        </Sheet>
                    </div>

                    {/* Logo */}
                    <div className="flex items-center">
                        <Link href="/" className="ml-4 flex lg:ml-0 gap-x-2">
                            <p className="font-bold text-xl uppercase tracking-widest">
                                VIBE<span className="text-primary">.</span>
                            </p>
                        </Link>
                    </div>

                    {/* Desktop Nav */}
                    <nav className="mx-6 hidden items-center space-x-4 lg:space-x-6 md:flex">
                        {routes.map((route) => (
                            <Link
                                key={route.href}
                                href={route.href}
                                className={cn(
                                    "text-sm font-medium transition-colors hover:text-black",
                                    route.active ? "text-black dark:text-white" : "text-muted-foreground"
                                )}
                            >
                                {route.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Icons */}
                    <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="icon" className="hidden sm:flex">
                            <Search className="h-5 w-5" />
                        </Button>
                        <Button variant="ghost" size="icon" asChild>
                            <Link href="/wishlist">
                                <Heart className="h-5 w-5" />
                            </Link>
                        </Button>
                        <CartSheet />
                        <UserButton user={user} />
                    </div>
                </div>
            </div>
        </div>
    );
}
