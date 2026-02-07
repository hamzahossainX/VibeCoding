"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User, LogOut, Settings } from "lucide-react";
import { signOut } from "next-auth/react"; // Use next-auth/react for client side signout if configured, OR server action.
// NOTE: V5 often uses server actions for signOut. 
// If next-auth/react is not installed or configured for V5, we should use a server action or a form.
// Let's check package.json again. next-auth v5 beta is installed.
// We can use a server action passed as prop or imported if "use server".
// But this is a client component. 
// Safest V5 pattern: <form action={logoutAction}>...</form>

import Link from "next/link";

interface UserButtonProps {
    user?: {
        name?: string | null;
        email?: string | null;
        image?: string | null;
    };
}

// We need a logout action. 
// Since we can't import server action directly into client component easily without "use server" file...
// Let's assume we can redirect to /api/auth/signout or use a server action.
// Actually, in the provided dashboard navbar earlier, it used a form with server action.

export const UserButton = ({ user }: UserButtonProps) => {
    if (!user) {
        return (
            <Button asChild variant="default" size="sm" className="rounded-full px-6">
                <Link href="/auth/login">Login</Link>
            </Button>
        );
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                    <Avatar className="h-9 w-9 border border-white/10">
                        <AvatarImage src={user.image || ""} alt={user.name || "User"} />
                        <AvatarFallback className="bg-primary/20 text-primary">
                            {user.name?.charAt(0).toUpperCase() || "U"}
                        </AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {user.email}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {/* Placeholder links */}
                <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="cursor-pointer">
                        <Settings className="mr-2 h-4 w-4" />
                        Dashboard
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="/wishlist" className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        Wishlist
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />

                <DropdownMenuItem
                    className="text-red-500 hover:text-red-500 focus:text-red-500 cursor-pointer"
                    onClick={() => signOut({ callbackUrl: "/" })}
                >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
