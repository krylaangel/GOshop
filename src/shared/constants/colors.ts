export const COLORS_OPTIONS = [
  { name: 'Black', className: 'bg-[var(--colorItemBlack)]' },
  { name: 'White', className: 'bg-[var(--colorItemWhite)]' },
  { name: 'Red', className: 'bg-[var(--colorItemRed)]' },
  { name: 'Green', className: 'bg-[var(--colorItemGreen)]' },
  { name: 'Blue', className: 'bg-[var(--colorItemBlue)]' },
  { name: 'Purple', className: 'bg-[var(--colorItemPurple)]' },
] as const
export type ColorsOption = typeof COLORS_OPTIONS[number]
