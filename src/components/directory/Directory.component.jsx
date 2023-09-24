import React from 'react';
import CategoryItem from '../category-item/CategoryItem.component';
import './directory-component.scss';

const Directory = (categoryData) => {
  const {categories} = categoryData;
  return (
    <div className="categories-container">
      {categories.map(category => (
        <CategoryItem key={category.id} {...{category}}  />
      ))}
    </div>
  )
}

export default Directory;