import { SidebarNavItem } from "types";

export const sidebarLinks: SidebarNavItem[] = [
  {
    title: "MENU",
    items: [
      {
        href: "/charts",
        icon: "dashboard",
        title: "Charts",
        // authorizeOnly: UserRole.USER,
      },
    ],
  },

  {
    title: "OPTIONS",
    items: [
      { href: "/dashboard/settings", icon: "settings", title: "Settings" },
      {
        href: "#",
        icon: "messages",
        title: "Support",
        // authorizeOnly: UserRole.USER,
        disabled: true,
      },
    ],
  },
];
