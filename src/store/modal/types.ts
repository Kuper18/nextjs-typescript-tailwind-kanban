export interface IAlertPopupStore {
  title: string;
  description: string;
  isOpen: boolean;
  toggleOpen: (value?: boolean) => void;
  onConfirm: () => void;
  setAlertData: (data: {
    title: string;
    description: string;
    onConfirm: () => void;
  }) => void;
}
