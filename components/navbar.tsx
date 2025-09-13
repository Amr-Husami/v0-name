"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ShoppingCart, User, Menu, X, LogOut, Settings } from "lucide-react"
import { LoginModal } from "./login-modal"
import { useAuth } from "@/contexts/auth-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"

interface NavbarProps {
  cartItemsCount: number
  onCartClick: () => void
}

export function Navbar({ cartItemsCount, onCartClick }: NavbarProps) {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { user, loading, signOut } = useAuth()

  const handleSignOut = async () => {
    await signOut()
    setIsMobileMenuOpen(false)
  }

  const getUserDisplayName = () => {
    if (!user?.email) return ""
    return user.email.split("@")[0]
  }

  return (
    <>
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/">
                <h1 className="text-2xl font-bold text-rose-600 arabic-text cursor-pointer">{"أمي وطفلي"}</h1>
              </Link>
            </div>

            {/* Desktop Navigation */}
            {/*
            <div className="hidden md:flex items-center space-x-reverse space-x-8">
              <a href="#" className="text-gray-700 hover:text-rose-600 transition-colors arabic-text">
                {"الرئيسية"}
              </a>
              <a href="#" className="text-gray-700 hover:text-rose-600 transition-colors arabic-text">
                {"مستلزمات الحمل"}
              </a>
              <a href="#" className="text-gray-700 hover:text-rose-600 transition-colors arabic-text">
                {"مستلزمات المواليد"}
              </a>
              <a href="#" className="text-gray-700 hover:text-rose-600 transition-colors arabic-text">
                {"العروض"}
              </a>
            </div>
            */}

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-reverse space-x-4">
              {!loading &&
                (user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="flex items-center space-x-reverse space-x-2">
                        <User className="h-4 w-4" />
                        <span className="arabic-text">
                          {"مرحباً"} {getUserDisplayName()}
                        </span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem className="arabic-text">{"الملف الشخصي"}</DropdownMenuItem>
                      <DropdownMenuItem className="arabic-text">{"طلباتي"}</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/admin" className="arabic-text flex items-center">
                          <Settings className="h-4 w-4 ml-2" />
                          {"لوحة الإدارة"}
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleSignOut} className="arabic-text text-red-600">
                        <LogOut className="h-4 w-4 ml-2" />
                        {"تسجيل الخروج"}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsLoginModalOpen(true)}
                    className="flex items-center space-x-reverse space-x-2"
                  >
                    <User className="h-4 w-4" />
                    <span className="arabic-text">{"تسجيل الدخول"}</span>
                  </Button>
                ))}

              <Button
                variant="ghost"
                size="sm"
                onClick={onCartClick}
                className="flex items-center space-x-reverse space-x-2 relative"
              >
                <ShoppingCart className="h-4 w-4" />
                <span className="arabic-text">{"السلة"}</span>
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button variant="ghost" size="sm" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t bg-white">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <a href="#" className="block px-3 py-2 text-gray-700 hover:text-rose-600 arabic-text">
                  {"الرئيسية"}
                </a>
                <a href="#" className="block px-3 py-2 text-gray-700 hover:text-rose-600 arabic-text">
                  {"مستلزمات الحمل"}
                </a>
                <a href="#" className="block px-3 py-2 text-gray-700 hover:text-rose-600 arabic-text">
                  {"مستلزمات المواليد"}
                </a>
                <a href="#" className="block px-3 py-2 text-gray-700 hover:text-rose-600 arabic-text">
                  {"العروض"}
                </a>
                <div className="flex items-center justify-between px-3 py-2 border-t">
                  {!loading &&
                    (user ? (
                      <div className="flex items-center space-x-reverse space-x-4">
                        <span className="text-sm text-gray-600 arabic-text">
                          {"مرحباً"} {getUserDisplayName()}
                        </span>
                        <div className="flex space-x-reverse space-x-2">
                          <Link href="/admin">
                            <Button variant="ghost" size="sm">
                              <Settings className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button variant="ghost" size="sm" onClick={handleSignOut} className="text-red-600">
                            <LogOut className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsLoginModalOpen(true)}
                        className="flex items-center space-x-reverse space-x-2"
                      >
                        <User className="h-4 w-4" />
                        <span className="arabic-text">{"تسجيل الدخول"}</span>
                      </Button>
                    ))}

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onCartClick}
                    className="flex items-center space-x-reverse space-x-2 relative"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    <span className="arabic-text">{"السلة"}</span>
                    {cartItemsCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {cartItemsCount}
                      </span>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </>
  )
}
