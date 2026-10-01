export interface NavItem {
  label: string;
  path: string;
  children?: NavItem[];
  comingSoon?: boolean;
}

export const navigationItems: NavItem[] = [
  {
    label: "nav.home",
    path: "/",
  },
  {
    label: "nav.about",
    path: "/about",
    children: [
      { label: "nav.whoWeAre", path: "/about/who-we-are" },
      { label: "nav.visionMission", path: "/about/vision-mission" },
      { label: "nav.mallInNumbers", path: "/about/mall-in-numbers" },
    ],
  },
  {
    label: "nav.sections",
    path: "/sections",
  },
  {
    label: "nav.events",
    path: "/events",
  },
  {
    label: "nav.maps",
    path: "/maps",
  },
  {
    label: "nav.gallery",
    path: "/gallery",
  },
  {
    label: "nav.business",
    path: "/business",
    children: [
      { label: "nav.rentalOpportunities", path: "/business/rental" },
      { label: "nav.investmentOpportunities", path: "/business/investment" },
    ],
  },
  {
    label: "nav.careers",
    path: "/careers",
  },
  {
    label: "nav.customerService",
    path: "/services/customer-service",
  },
  {
    label: "nav.faq",
    path: "/services/faq",
  },
  {
    label: "nav.contact",
    path: "/contact",
  },
];
