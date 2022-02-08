import React, { useState } from 'react';

import axios from 'axios';

function AddTasksForm({ list, onAddTask }) {
  const [visivleForm, setVisibleForm] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const toggleFormVisible = () => {
    setVisibleForm(!visivleForm);
    setInputValue('');
  };

  const addTask = () => {
    if (inputValue) {
      const obj = {
        listId: list.id,
        text: inputValue,
        completed: false,
      };
      setIsLoading(true);
      axios
        .post('http://localhost:3001/tasks', obj)
        .then(({ data }) => {
          onAddTask(list.id, data);
          toggleFormVisible();
        })
        .catch(() => alert('Ошибка при добавлении списка'))
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      alert('Введите текст задачи');
    }
  };
  return (
    <div className="tasks__form">
      {!visivleForm ? (
        <div onClick={toggleFormVisible} className="tasks__form-new">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M8 1V15"
              stroke="#B4B4B4"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M1 8H15"
              stroke="#B4B4B4"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>Новая задача</span>
        </div>
      ) : (
        <div className="tasks__form-add">
          <input
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            type="text"
            placeholder="Текст задачи"
            className="field"
          />
          <div className="tasks__form-btn-wrap">
            <button onClick={addTask} className="btn" disabled={isLoading}>
              {isLoading ? 'Добавление...' : 'Добавить задачу'}
            </button>
            <button onClick={toggleFormVisible} className="btn btn--grey">
              Отмена
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
export default AddTasksForm;
