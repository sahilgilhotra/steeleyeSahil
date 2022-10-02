
import React, { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';

// Single List Item
const WrappedSingleListItem = ({
  index,
  isSelected,
  onClickHandler,
  text,
}) => {
  return (
    <li
      style={{ backgroundColor: isSelected ? 'green' : 'red'}}
      onClick={onClickHandler(index)}
    >
      {text}
    </li>
  );
};
WrappedSingleListItem.propTypes = {
  index: PropTypes.number,
  isSelected: PropTypes.bool,
  onClickHandler: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};
const SingleListItem = memo(WrappedSingleListItem);

// List Component
const WrappedListComponent = ({items}) => {

    //setState parametrer error
  const [selectedIndex, setSelectedIndex] = useState();

  useEffect(() => {
    setSelectedIndex(true);
  }, [items]);

  const handleClick = index => {
    setSelectedIndex(index);

    console.log("Index Value: "+index);
  };

  return (
    <ul style={{ textAlign: 'left' }}>
      {items.map((item, index) => (
        <SingleListItem
          onClickHandler={() => handleClick(index)}
          text={item.text}
          index={index}
          isSelected={selectedIndex}
          //key is missing
          key={index}
        />
      ))}
    </ul>
  )
};

WrappedListComponent.propTypes = {

    //It should be arrayOf instead of shapeOf
    
  items: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
  })),
};

//Fixed :[null]
WrappedListComponent.defaultProps = {
  items:  [
    { index: 1, text: "Sahil" },
    { index: 2, text: "Gilhotra" },
   
  ]
};

const List = memo(WrappedListComponent);

export default List;
