import React, { useState } from "react";
import Proptypes from "prop-types";
import "../TaskItem/TaskItem";

export default function TaskItem({
  id,
  title,
  taskState,
  onTaskUpdate,
  onDeleteTask
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editabletitle, setEditabletitle] = useState(title);
  const onTitleChange = (event) => {
    const newTitle = event.target.value;
    setEditabletitle(newTitle);
    onTaskUpdate(id, newTitle, taskState);
  };
  const onKeyPress = (event) => {
    if (event.key === "Enter") {
      setIsEditing(false);
      if (editabletitle.length === 0) {
        onDeleteTask(id);
      }
    }
  };

  const onTaskStateChange = (event) => {
    onTaskUpdate(id, title, event.target.value);
  };

  if (isEditing) {
    return (
      <div className="task-item">
        <input
          type="text"
          value={editabletitle}
          onChange={onTitleChange}
          onKeyPress={onKeyPress}
        />
      </div>
    );
  } else {
    return (
      <div className="task-item">
        <div onClick={(e) => setIsEditing(true)}>{editabletitle}</div>
        <select onChange={onTaskStateChange} value={taskState}>
          <option value="Pendente">Pendente</option>
          <option value="Fazendo">Fazendo</option>
          <option value="Completo">Completo</option>
        </select>
      </div>
    );
  }
}

TaskItem.propTypes = {
  id: Proptypes.number.isRequired,
  title: Proptypes.string.isRequired,
  taskState: Proptypes.string.isRequired
};
