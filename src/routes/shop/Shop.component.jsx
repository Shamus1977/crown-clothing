import React,  {useContext, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { CategoriesContext } from '../../contexts/categories.context';
import CategoriesPreview from '../categories-preview/CategoriesPreview.components';
import Category from '../category/Category.component';
import './shop.styles.scss';

const Shop = () => {
  const { categoriesMap } = useContext(CategoriesContext);

  useEffect(() => {
    console.log(categoriesMap)
  },[]);

  return (
    <Routes>
      <Route index element={ <CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  )
}

export default Shop;