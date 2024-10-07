export interface IHeaderTranslate {
  navbar: Navbar[];
  accountSettings: Setting[];
  point: string;
  notification: string;
  language: string;
}

export interface Navbar {
  title: string;
  ref: string;
}

export interface Setting {
  title: string;
  ref: string;
  extraComponent?: boolean;
  key?: string;
}
