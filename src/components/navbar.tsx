"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ModeToggle } from "./darkmode-toggle-button"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/contact", label: "Contact" },
    { href: "/signup", label: "Signup" },
    { href: "/login", label: "Login" },
  ]

  return (
    <header className="border-b sticky top-0 z-50 bg-background/80 backdrop-blur flex items-center justify-center supports-[backdrop-filter]:bg-background/60">
      <div className="container max-w-6xl  flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold">
          🚀 RajivApp
        </Link>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center justify-center gap-6 ">
            <ModeToggle/>
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Mobile menu */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col space-y-4 mt-6">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-start"
                >
                  <X className="w-4 h-4 mr-2" />
                  Close
                </Button>
                {links.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setIsOpen(false)}
                    className="text-sm font-medium hover:text-primary"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
