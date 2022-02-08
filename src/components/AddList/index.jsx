import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Bage from '../Bage';
import List from '../List';
import CloseSvg from '../../assets/img/close.svg';
import './AddListButton.scss';
import { jsonApi } from '../../Api';

const AddList = ({ colors, onAdd }) => {
  const [visiblePopup, setVisiblePopup] = useState(false);
  const [selectedColor, selectColor] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (Array.isArray(colors)) {
      // selectedColor(colors[0].id);
    }
  }, [colors]);

  const onClose = () => {
    setVisiblePopup(false);
    setInputValue('');
    selectColor(colors[0].id);
  };

  const addList = () => {
    if (!inputValue) {
      alert('Введите название списка');
      return;
    }
    setIsLoading(true);
    axios
      .post(`${jsonApi}/lists`, { name: inputValue, colorId: selectedColor })
      .then(({ data }) => {
        const color = colors.filter((color) => color.id === selectedColor)[0];
        const listObj = { ...data, color, tasks: [] };
        onAdd(listObj);
        onClose();
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="add-list">
      <List
        onClick={() => setVisiblePopup(true)}
        items={[
          {
            className: 'list__add-button',
            icon: (
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M6 1V11"
                  stroke="#868686"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M1 6H11"
                  stroke="#868686"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ),
            name: 'Добавить список',
          },
        ]}
      />
      {visiblePopup && (
        <div className="add-list__popup">
          <img src={CloseSvg} alt="close" className="add-list__close" onClick={onClose} />

          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            type="text"
            placeholder="Название списка"
            className="field"
          />

          <div className="add-list__popup-colors">
            {colors.map((color) => (
              <Bage
                onClick={() => selectColor(color.id)}
                key={color.id}
                color={color.name}
                className={selectedColor == color.id && 'active'}
              />
            ))}
          </div>

          <button onClick={addList} className="btn">
            {isLoading ? 'Добавление...' : 'Добавить'}
          </button>
        </div>
      )}
    </div>
  );
};

export default AddList;
