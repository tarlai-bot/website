export interface NavItem {
  label: string;
  labelAr: string;
  path: string;
  children?: NavItem[];
  comingSoon?: boolean;
}

export interface SocialMediaLink {
  platform: string;
  url: string;
  icon: string;
}
