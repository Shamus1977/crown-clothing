import React from 'react';
import './directory-item.styles.scss';
import { useNavigate } from 'react-router-dom';

const DirectoryItem = ({ category }) => {

  const { imageUrl, title, route} = category;
  const navigate = useNavigate();

  const onNavigateHandler = () => navigate(route);
  return (
    <div onClick={onNavigateHandler} className="directory-item-container">
      <div className="background-image" 
        style={{
          backgroundImage: `url(${imageUrl})`
        }}
      />
      <div className="body">
        <h2>{ title }</h2>
        <p>Shop Now</p>
      </div>
    </div>
  )
}

export default DirectoryItem;