import { Logo } from "@/components/ui/Logo";

export function Footer() {
  const columns = [
    {
      title: "Programs",
      links: ["ATF Challenge", "Research", "Chapters", "Consulting"],
    },
    {
      title: "Resources",
      links: ["Publications", "News", "Articles", "Events"],
    },
    {
      title: "Organization",
      links: ["About", "Team", "Partners", "Contact"],
    },
  ];

  return (
    <footer
      style={{
        backgroundColor: "#0A0A0A",
        padding: "80px 48px 40px",
        color: "#FFFFFF",
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div>
            <Logo variant="negSpace" size="md" />
            <p
              className="mt-4 text-sm opacity-60"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                lineHeight: 1.65,
              }}
            >
              Empowering Africa's technology future through research,
              education, and community.
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h4
                className="text-sm uppercase mb-4"
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  color: "rgba(255,255,255,0.5)",
                }}
              >
                {col.title}
              </h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <span
                      className="text-sm opacity-80 hover:opacity-100 cursor-pointer"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {link}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div
          className="border-t border-white/10 pt-8 flex justify-between items-center text-xs opacity-50"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          <span>&copy; 2026 African Technology Forum. All rights reserved.</span>
          <div className="flex gap-6">
            <span className="cursor-pointer">Privacy Policy</span>
            <span className="cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
