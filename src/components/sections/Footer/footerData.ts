import { Facebook, Twitter, Linkedin, Youtube, Mail, MapPin, type LucideIcon } from "lucide-react";

export const footerLinks = {
  programs: [
    { label: "ATF Consulting", href: "/legacy/consulting" },
    { label: "ATF Challenge", href: "/legacy/challenge" },
    { label: "ATF Chapters", href: "/legacy/chapters" },
  ],
  about: [
    { label: "Our Story", href: "/legacy/about" },
    { label: "Team", href: "/legacy/team" },
    { label: "News", href: "/legacy/news" },
  ],
  resources: [
    { label: "Articles", href: "/legacy/articles" },
    { label: "Research", href: "/legacy/research" },
    { label: "Publications", href: "/legacy/publications" },
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
