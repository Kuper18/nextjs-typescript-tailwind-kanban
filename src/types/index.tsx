export interface IIcon {
  className?: string;
  fill?: string;
}

export interface IDropdownOption {
  title: string;
  className?: string;
  action: () => void;
}
