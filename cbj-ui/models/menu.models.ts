export interface MenuItem {
  id: number;
  title: string;
  active: boolean;
  click: (item: any) => void;
}
