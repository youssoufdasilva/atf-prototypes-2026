import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronDown, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/Logo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTheme } from "@/contexts/ThemeContext";

interface NavItem {
  label: string;
  href?: string;
  children?: { label: string; href: string }[];
}

const navItems: NavItem[] = [
  {
    label: "Who We Are",
    children: [
      { label: "Our Mission, Vision and Story", href: "/legacy/about" },
      { label: "The Team And Contributors", href: "/legacy/team" },
    ],
  },
  {
    label: "What We Do",
    children: [
      { label: "ATF Consulting", href: "/legacy/consulting" },
      { label: "ATF Challenge", href: "/legacy/challenge" },
      { label: "ATF Chapters", href: "/legacy/chapters" },
    ],
  },
  {
    label: "Where We Work",
    children: [
      { label: "Ghana", href: "/legacy/countries/ghana" },
      { label: "Nigeria", href: "/legacy/countries/nigeria" },
      { label: "Kenya", href: "/legacy/countries/kenya" },
      { label: "South Africa", href: "/legacy/countries/south-africa" },
    ],
  },
  {
    label: "Publications",
    children: [
      { label: "Articles", href: "/legacy/articles" },
      { label: "Research Papers", href: "/legacy/research" },
    ],
  },
  {
    label: "News",
    href: "/legacy/news",
  },
];

const registeredRoutes = [
  "/",
  "/legacy",
  "/legacy/about",
  "/legacy/team",
  "/legacy/consulting",
  "/legacy/challenge",
  "/legacy/chapters",
  "/legacy/news",
  "/legacy/articles",
  "/legacy/research",
  "/legacy/publications",
  "/legacy/privacy-policy",
  "/legacy/terms-of-service",
];

// Check if route is registered or is a dynamic country route
const isRegisteredRoute = (href: string) => {
  if (registeredRoutes.includes(href)) return true;
  // Handle dynamic country routes
  if (href.startsWith("/legacy/countries/")) return true;
  if (href.startsWith("/legacy/news/")) return true;
  return false;
};

function NavLink({
  href,
  children,
  className,
  style,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}) {
  if (isRegisteredRoute(href)) {
    return (
      <Link
        to={href}
        className={className}
        style={style}
        onClick={onClick}
      >
        {children}
      </Link>
    );
  }
  // For unregistered routes, use a regular anchor that shows the path
  return (
    <a
      href={href}
      className={className}
      style={style}
      onClick={(e) => {
        e.preventDefault();
        onClick?.();
        // Could show a toast or navigate to a 404 page
      }}
    >
      {children}
    </a>
  );
}

function DesktopNav() {
  const { theme } = useTheme();

  return (
    <nav className="hidden lg:flex items-center gap-1">
      {navItems.map((item) =>
        item.children ? (
          <DropdownMenu key={item.label} modal={false}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-1 px-4 py-2"
                style={{ color: theme.foreground }}
              >
                {item.label}
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="min-w-[200px]"
              style={{
                backgroundColor: theme.card,
                borderColor: theme.border,
              }}
            >
              {item.children.map((child) => (
                <DropdownMenuItem key={child.href} asChild>
                  <NavLink
                    href={child.href}
                    className="cursor-pointer w-full"
                    style={{ color: theme.foreground }}
                  >
                    {child.label}
                  </NavLink>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <NavLink key={item.label} href={item.href!}>
            <Button
              variant="ghost"
              className="px-4 py-2"
              style={{ color: theme.foreground }}
            >
              {item.label}
            </Button>
          </NavLink>
        )
      )}
    </nav>
  );
}

function MobileNav() {
  const { theme, accentColor, isDarkTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen} modal={false}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="w-6 h-6" style={{ color: theme.foreground }} />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-[300px] p-0"
        style={{
          backgroundColor: theme.background,
          borderColor: theme.border,
        }}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div
            className="flex items-center justify-between p-4 border-b"
            style={{ borderColor: theme.border }}
          >
            <Link to="/legacy" onClick={() => setIsOpen(false)}>
              <Logo size="sm" variant={isDarkTheme || theme.logoVariant === "negSpace" ? "negSpace" : "standard"} />
            </Link>
          </div>

          {/* Nav items */}
          <div className="flex-1 overflow-y-auto p-4">
            <Accordion type="single" collapsible className="w-full">
              {navItems.map((item, index) =>
                item.children ? (
                  <AccordionItem
                    key={item.label}
                    value={`item-${index}`}
                    className="border-b"
                    style={{ borderColor: theme.border }}
                  >
                    <AccordionTrigger
                      className="py-4 text-base font-medium"
                      style={{ color: theme.foreground }}
                    >
                      {item.label}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-col gap-2 pb-4">
                        {item.children.map((child) => (
                          <NavLink
                            key={child.href}
                            href={child.href}
                            onClick={() => setIsOpen(false)}
                            className="py-2 px-4 rounded-lg text-sm transition-colors"
                            style={{
                              color: theme.foregroundMuted,
                            }}
                          >
                            {child.label}
                          </NavLink>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ) : (
                  <NavLink
                    key={item.label}
                    href={item.href!}
                    onClick={() => setIsOpen(false)}
                    className="flex py-4 text-base font-medium border-b"
                    style={{
                      color: theme.foreground,
                      borderColor: theme.border,
                    }}
                  >
                    {item.label}
                  </NavLink>
                )
              )}
            </Accordion>
          </div>

          {/* CTA */}
          <div className="p-4 border-t" style={{ borderColor: theme.border }}>
            <Link to="/legacy/challenge" onClick={() => setIsOpen(false)}>
              <Button
                className="w-full"
                style={{
                  backgroundColor: accentColor,
                  color: theme.accentForeground,
                }}
              >
                Join ATF Challenge
              </Button>
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export function Navbar() {
  const { theme, accentColor, isDarkTheme } = useTheme();

  return (
    <header
      className="sticky top-0 z-40 border-b backdrop-blur-md"
      style={{
        backgroundColor: `${theme.background}e6`,
        borderColor: theme.border,
      }}
    >
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/legacy" className="flex items-center gap-3">
            <Logo size="md" variant={isDarkTheme || theme.logoVariant === "negSpace" ? "negSpace" : "standard"} />
            <span
              className="hidden sm:block font-heading font-bold text-lg"
              style={{ color: theme.foreground }}
            >
              African Technology Forum
            </span>
          </Link>

          {/* Desktop Navigation */}
          <DesktopNav />

          {/* CTA and Mobile menu */}
          <div className="flex items-center gap-4">
            <Link to="/legacy/challenge" className="hidden lg:block">
              <Button
                style={{
                  backgroundColor: accentColor,
                  color: theme.accentForeground,
                }}
              >
                Join Challenge
              </Button>
            </Link>
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
}
