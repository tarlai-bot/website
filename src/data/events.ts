export interface Event {
  id: string;
  titleKey: string;
  descriptionKey: string;
  locationKey: string;
  image: string;
  startDate: string;
  endDate: string;
  isActive?: boolean;
}

export const eventsData: Event[] = [
  {
    id: "1",
    titleKey: "pages:events.list.summerSale.title",
    descriptionKey: "pages:events.list.summerSale.description",
    locationKey: "pages:events.list.summerSale.location",
    image: "/images/alamerMall/placeholderAlamerMallBanner.jpg",
    startDate: "2025-11-13T00:00:00",
    endDate: "2025-12-31T23:59:59",
    isActive: true,
  },
  {
    id: "2",
    titleKey: "pages:events.list.kidsFestival.title",
    descriptionKey: "pages:events.list.kidsFestival.description",
    locationKey: "pages:events.list.kidsFestival.location",
    image: "/images/alamerMall/placeholderAlamerMallBanner.jpg",
    startDate: "2025-11-13T10:00:00",
    endDate: "2025-11-20T22:00:00",
    isActive: true,
  },
  {
    id: "3",
    titleKey: "pages:events.list.foodWeek.title",
    descriptionKey: "pages:events.list.foodWeek.description",
    locationKey: "pages:events.list.foodWeek.location",
    image: "/images/alamerMall/placeholderAlamerMallBanner.jpg",
    startDate: "2025-11-13T11:00:00",
    endDate: "2025-11-17T23:00:00",
    isActive: true,
  },
  {
    id: "4",
    titleKey: "pages:events.list.techExpo.title",
    descriptionKey: "pages:events.list.techExpo.description",
    locationKey: "pages:events.list.techExpo.location",
    image: "/images/alamerMall/placeholderAlamerMallBanner.jpg",
    startDate: "2025-11-14T09:00:00",
    endDate: "2025-11-16T21:00:00",
  },
  {
    id: "5",
    titleKey: "pages:events.list.ramadanMarket.title",
    descriptionKey: "pages:events.list.ramadanMarket.description",
    locationKey: "pages:events.list.ramadanMarket.location",
    image: "/placeholderAlamerMallBanner.jpg",
    startDate: "2025-11-13T18:00:00",
    endDate: "2025-11-15T02:00:00",
  },
  {
    id: "6",
    titleKey: "pages:events.list.fashionWeek.title",
    descriptionKey: "pages:events.list.fashionWeek.description",
    locationKey: "pages:events.list.fashionWeek.location",
    image: "/placeholderAlamerMallBanner.jpg",
    startDate: "2025-11-13T16:00:00",
    endDate: "2025-11-14T22:00:00",
  },
  {
    id: "7",
    titleKey: "pages:events.list.blackFriday.title",
    descriptionKey: "pages:events.list.blackFriday.description",
    locationKey: "pages:events.list.blackFriday.location",
    image: "/placeholderAlamerMallBanner.jpg",
    startDate: "2025-11-28T06:00:00",
    endDate: "2025-11-29T23:59:59",
  },
  {
    id: "8",
    titleKey: "pages:events.list.winterWonderland.title",
    descriptionKey: "pages:events.list.winterWonderland.description",
    locationKey: "pages:events.list.winterWonderland.location",
    image: "/placeholderAlamerMallBanner.jpg",
    startDate: "2025-12-01T10:00:00",
    endDate: "2025-12-31T22:00:00",
  },
  {
    id: "9",
    titleKey: "pages:events.list.healthFair.title",
    descriptionKey: "pages:events.list.healthFair.description",
    locationKey: "pages:events.list.healthFair.location",
    image: "/placeholderAlamerMallBanner.jpg",
    startDate: "2025-11-13T08:00:00",
    endDate: "2025-11-14T20:00:00",
  },
  {
    id: "10",
    titleKey: "pages:events.list.artFestival.title",
    descriptionKey: "pages:events.list.artFestival.description",
    locationKey: "pages:events.list.artFestival.location",
    image: "/placeholderAlamerMallBanner.jpg",
    startDate: "2025-11-15T10:00:00",
    endDate: "2025-11-17T21:00:00",
  },
];
