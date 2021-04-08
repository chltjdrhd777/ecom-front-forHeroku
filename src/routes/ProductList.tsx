import React from "react";
import HeaderLayout from "Layout/Header";
import { RouteComponentProps } from "react-router-dom";
import { paramRendor } from "util/Params";
import StorepageForSamsung from "./StorePage";
import StorepageForApple from "./StorepageForApple";

export interface PramsType2 extends RouteComponentProps<{ slug: string }> {}

//! /:slug => this slug information is stored in props.match.params as {slug:string}
function ProductList(props: PramsType2) {
  const typeChecker = paramRendor(props.location.search) as { categoryId: string; type: string };
  const pageCrossRoads = () => {
    if (typeChecker) {
      switch (typeChecker.type) {
        case "store":
          return <StorepageForSamsung {...props} />;

        case "page":
          return <StorepageForApple {...props} />;
      }
    }
  };

  return <HeaderLayout>{pageCrossRoads()}</HeaderLayout>;
}

export default ProductList;
