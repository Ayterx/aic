import { GridLayout, GridPlus } from "./gridStyle"

export const Footer = () => (
  <footer className="relative mx-auto mb-8 max-w-4xl p-4 text-center text-neutral-500">
    <GridLayout style="x-y" />
    <GridPlus position="top-left" />
    <GridPlus position="top-right" />
    Made by: <span className="text-neutral-200">Mohammed Saleh Almutairi</span> (443229323)
  </footer>
)
