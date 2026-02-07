"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HeroSection() {
    return (
        <div className="relative overflow-hidden bg-background py-20 md:py-32">
            {/* Abstract Background Shapes */}
            <div aria-hidden="true" className="absolute inset-0 z-0">
                <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
            </div>

            <div className="container relative z-10 mx-auto px-4 text-center">
                <div className="mx-auto max-w-3xl">
                    <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
                        Elevate Your Vibe with Premium Gear
                    </h1>
                    <p className="mt-4 text-lg text-muted-foreground sm:text-xl mb-10 max-w-2xl mx-auto">
                        Discover a curated collection of minimalist essentials designed for the modern creator. Quality, style, and function in perfect harmony.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" className="rounded-full px-8 text-lg h-12" asChild>
                            <Link href="/shop">Shop Now</Link>
                        </Button>
                        <Button variant="outline" size="lg" className="rounded-full px-8 text-lg h-12" asChild>
                            <Link href="/about">Learn More</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
