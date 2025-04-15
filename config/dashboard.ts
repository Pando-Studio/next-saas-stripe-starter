import { SidebarNavItem } from "types";

export const sidebarLinks: SidebarNavItem[] = [
  {
    title: "MENU",
    items: [
      {
        href: "/chats",
        icon: "dashboard",
        title: "Chats",
        // authorizeOnly: UserRole.USER,
      },
      {
        href: "/catalogs",
        icon: "bookOpen",
        title: "Catalogues",
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
