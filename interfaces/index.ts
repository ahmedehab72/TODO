export interface ITodo {
    title: string;
    body: string | null;
    completed: boolean;
    id?: string;
    createdAt?: Date;
}

//  footer component
export interface MenuItem {
  title: string;
  links: {
    text: string;
    url: string;
  }[];
}

export interface Footer2Props {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  tagline?: string;
  menuItems?: MenuItem[];
  copyright?: string;
  bottomLinks?: {
    text: string;
    url: string;
  }[];
}