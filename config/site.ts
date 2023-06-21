export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Convert",
  description:
    "Beautifully designed components built with Radix UI and Tailwind CSS.",
  mainNav: [
    {
      title: "Início",
      href: "/",
    },
    {
      title: "Como funciona",
      href: "/#works",
    },
    {
      title: "FAQ",
      href: "/#faq",
    },
  ],
  links: {
    twitter: "https://twitter.com/shadcn",
    github: "https://github.com/shadcn/ui",
    docs: "https://ui.shadcn.com",
  },
}
