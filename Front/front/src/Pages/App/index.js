import * as React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Routes,
} from "react-router-dom";

import Product from "../Product";
import ProductType from "../ProductType";
import Tax from "../Tax";
import Sale from "../Sale";
import SaleSearch from "../Sale/search";
import TaxProductType from "../TaxProductType";
import Login from "../Login";

const router = createBrowserRouter([
  { path: "/", Component: Login },
  { path: "/sale", Component: Sale },
  { path: "/saleSearch", Component: SaleSearch },
  { path: "/tax", Component: Tax },
  { path: "/product", Component: Product },
  { path: "/productType", Component: ProductType },
  { path: "/taxProductType", Component: TaxProductType },
  { path: "*", Component: Root },
]);

export default function App() {
  return <RouterProvider router={router} />;
}

function Root() {

    return (  
        <Routes>
        </Routes>
    )
  
  }
  

  