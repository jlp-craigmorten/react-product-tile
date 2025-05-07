export const image = 'ProductTile.Image';
export const description = 'ProductTile.Description';
export const price = 'ProductTile.Price';
export const review = 'ProductTile.Review';

interface Slots {
  [slot: string]: React.ReactNode;
}

export interface LayoutComponentProps {
  slots: Slots;
  children?: React.ReactNode | undefined;
}
