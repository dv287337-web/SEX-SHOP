import { catalogProducts as bdsmProducts } from "../Pages/catalog/BDSM";
import { catalogProducts as cosmeticaProducts } from "../Pages/catalog/Cosmetica";
import { catalogProducts as juguetesProducts } from "../Pages/catalog/Juguetes";
import { catalogProducts as lenceriaProducts } from "../Pages/catalog/Lenceria";
import { catalogProducts as ofertasProducts } from "../Pages/catalog/Ofertas";
import { catalogProducts as paraElProducts } from "../Pages/catalog/ParaEl";
import { catalogProducts as paraEllaProducts } from "../Pages/catalog/ParaElla";
import { catalogProducts as paraParejasProducts } from "../Pages/catalog/ParaParejas";

export const allCatalogProducts = [
  ...paraEllaProducts,
  ...paraElProducts,
  ...paraParejasProducts,
  ...lenceriaProducts,
  ...juguetesProducts,
  ...cosmeticaProducts,
  ...bdsmProducts,
  ...ofertasProducts,
];
