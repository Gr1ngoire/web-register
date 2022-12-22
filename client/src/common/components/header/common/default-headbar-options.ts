import { AppRoutes } from "@/common/enums/enums";

type HeaderSelectOption = {
  id: number;
  link: string;
  name: string;
  isSelected: boolean;
  requiresAuth: boolean;
};

const defaultSelectOptions: HeaderSelectOption[] = [
  {
    id: 1,
    link: AppRoutes.SCHEDULE,
    name: "Schedule",
    isSelected: false,
    requiresAuth: false,
  },
  {
    id: 2,
    link: AppRoutes.NEWS,
    name: "News",
    isSelected: false,
    requiresAuth: false,
  },
  {
    id: 3,
    link: AppRoutes.FAQ,
    name: "Faq",
    isSelected: false,
    requiresAuth: true,
  },
  {
    id: 4,
    link: AppRoutes.ADMINISTRATION,
    name: "Administration",
    isSelected: false,
    requiresAuth: true,
  },
];

export { defaultSelectOptions };
