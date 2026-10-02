import type { ComponentType } from "react";

export type CatalogEntry = {
  id: string;
  name: string;
  description?: string;
  category?: string;
  Preview: ComponentType;
};
