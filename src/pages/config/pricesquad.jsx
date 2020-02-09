import { Pricesquad } from "@flight-squad/common";
export const PricesquadApiRoot = process.env.REACT_APP_PRICESQUAD;
export const PriceSquad = new Pricesquad(PricesquadApiRoot);
