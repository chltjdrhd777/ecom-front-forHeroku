import React from "react";
import { useSelector } from "react-redux";
import { selectCategory, selectProduct } from "redux/mainReducer";

function MakingCategoryTree(productDetail: any, categoryList: any) {
  const renderCategory = () => {
    const dataPool = (
      categoryList: { _id: string; name: string; slug: string; parentId?: string; children?: typeof categoryList }[],
      pool = [] as typeof categoryList
    ) => {
      if (categoryList && Object.keys(categoryList).length !== 0) {
        for (let eachCate of categoryList) {
          pool.push(eachCate);
          if (eachCate.children && eachCate.children.length !== 0) {
            dataPool(eachCate.children, pool);
          }
        }
      }
      return pool;
    };
    return dataPool(categoryList);
  };

  const categoryGathered = renderCategory();

  const makingFamilyTree = (resultPool = [] as any[]) => {
    const findone = categoryGathered.find((eachCate) => eachCate._id === productDetail.category);
    resultPool.push(findone);

    const findYourParent = (targetCate: typeof findone) => {
      if (targetCate && targetCate.parentId) {
        const findparent = categoryGathered.find((eachparent) => eachparent._id === targetCate.parentId);
        findparent && resultPool.push(findparent);
        if (findparent?.parentId) {
          findYourParent(findparent);
        }
      }
    };

    findYourParent(findone);

    return resultPool;
  };

  const finalResult = makingFamilyTree();

  return finalResult;
}

export { MakingCategoryTree };
