"use client"
import { Avatar, AvatarFallback} from "@/components/ui/avatar"
import { Heart, ShoppingBasket, Store, UserRound } from 'lucide-react'
import { NavigationMenu,NavigationMenuItem,NavigationMenuLink,navigationMenuTriggerStyle,} from "@/components/ui/navigation-menu"
import {DropdownMenu,DropdownMenuContent,DropdownMenuGroup, DropdownMenuItem,DropdownMenuLabel,DropdownMenuSeparator,DropdownMenuTrigger,} from "@/components/ui/dropdown-menu"
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import useGetCart from '@/hooks/useCart'
import { Badge } from '../ui/badge'
import { CartProductI } from '@/interfaces/cart'
import useGetWhishlist from '@/hooks/useWhishlist'
// import { getServerSession } from 'next-auth'
// import { authOptions } from '@/lib/authOptions'

export default function Navbar() {
    // const sessionData = await getServerSession(authOptions)
    const { data: session, status } = useSession()
    const { data } = useGetCart();
    const { data: whishlist } = useGetWhishlist()
    const totalItems = data?.data?.products?.reduce((accu:number, product:CartProductI)=> product.count + accu, 0)
    const whishlistCount = whishlist?.count
    function logOutUser (){
        signOut({
            callbackUrl: "/login"
        })
    }
    return (
        <>
            <nav className='p-5' >
                <div className='max-w-7xl mx-auto flex justify-between'>
                    {/* Logo & Name */}
                    <div className='nav-logo flex items-center gap-1'>
                        <Avatar className='rounded-lg' size='lg'>
                            <AvatarFallback className='rounded-lg text-white bg-[#2a5631] border-0' >
                                <Store size={28}/>
                            </AvatarFallback>
                        </Avatar>
                        <Link className='font-bold text-xl' href="/">Comercio</Link>
                    </div>
                    {/* Links */}
                    <div className="nav-links flex items-center">
                        <NavigationMenu className='flex items-center gap-3'>
                            <NavigationMenuItem>
                                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                    <Link href="/products">Products</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                    <Link href="/categories">Categories</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                    <Link href="/brands">Brands</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        </NavigationMenu>
                    </div>
                    {/* WishList, Cart, User */}
                    <div className="icons flex items-center gap-7">
                        
                        <Link href="/userWhishlist" className="relative inline-block">
                            <Heart size={30} className='p-0.5' />
                            { whishlistCount>0 && <Badge className='absolute -top-2 -right-2 h-4 w-4 rounded-2xl bg-[#2a5631] '>{whishlistCount}</Badge>}
                        </Link>
                        <Link href="/userCart" className="relative inline-block">
                            <ShoppingBasket size={30}/>
                            {totalItems>0 && <Badge className='absolute -top-2 -right-2 h-4 w-4 rounded-2xl bg-[#2a5631] '>{totalItems}</Badge>}
                        </Link>
                        {/* user menu */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <UserRound size={32} className='cursor-pointer rounded-2xl bg-[#B58D47] px-1 text-white'/>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-32">
                                {status === "unauthenticated" && (
                                <>
                                <DropdownMenuGroup>
                                    <DropdownMenuItem asChild className='cursor-pointer'>
                                        <Link href="/login">Log-In</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild className='cursor-pointer'>
                                        <Link href="/register">Register</Link>
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                </>
                                )}
                                {status === "authenticated" && (
                                <>
                                <DropdownMenuLabel>Welcome, {session.user?.name}</DropdownMenuLabel>
                                <DropdownMenuGroup>
                                    <DropdownMenuItem asChild className='cursor-pointer'>
                                        <Link href="/profile">Profile</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild className='cursor-pointer'>
                                        <Link href="/allorders">Your orders</Link>
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem className='cursor-pointer' onClick={logOutUser} variant="destructive">Log out</DropdownMenuItem>
                                </DropdownMenuGroup>
                                </>
                                )}
                                
                            </DropdownMenuContent>
                        </DropdownMenu> 
                    </div>
                </div>
            </nav>
        </>
    )
}
