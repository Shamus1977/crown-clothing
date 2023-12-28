import React,  {Fragment, useContext, useEffect } from 'react';
import { CategoriesContext } from '../../contexts/categories.context';
import CategoryPreview from '../../components/category_preview/CategoryPreview.component';

const CategoriesPreview = () => {
  const { categoriesMap } = useContext(CategoriesContext);

  useEffect(() => {
    console.log(categoriesMap)
  },[]);

  return (
    <Fragment>
      {
        Object.keys(categoriesMap).map(title =>{
          const products = categoriesMap[title];
          return <CategoryPreview key={title} title={title} products={products} />
        })
      }
    </Fragment>
  )
}

export default CategoriesPreview;