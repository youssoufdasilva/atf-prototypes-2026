import { Facebook, Twitter, Linkedin, Youtube, Mail, MapPin, type LucideIcon } from "lucide-react";

export const footerLinks = {
  programs: [
    { label: "ATF Consulting", href: "/consulting" },
    { label: "ATF Challenge", href: "/challenge" },
    { label: "ATF Chapters", href: "/chapters" },
  ],
  about: [
    { label: "Our Story", href: "/about" },
    { label: "Team", href: "/team" },
    { label: "News", href: "/news" },
  ],
  resources: [
    { label: "Articles", href: "/articles" },
    { label: "Research", href: "/research" },
    { label: "Publications", href: "/publications" },
  ],
};

export interface SocialLink {
  icon: LucideIcon;
  href: string;
  label: string;
}

export const socialLinks: SocialLink[] = [
  { icon: Facebook, href: "#social-facebook", label: "Facebook" },
  { icon: Twitter, href: "#social-twitter", label: "Twitter" },
  { icon: Linkedin, href: "#social-linkedin", label: "LinkedIn" },
  { icon: Youtube, href: "#social-youtube", label: "YouTube" },
];

export const contactInfo = {
  email: "info@atfglobal.org",
  location: "Accra, Ghana",
};

export { Mail, MapPin };
