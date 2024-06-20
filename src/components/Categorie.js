import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { Button, Badge } from 'react-bootstrap';
import Tache from './Tache';
import { FaTrash } from 'react-icons/fa';

const Categorie = ({ column, tasks, onAddTask, onDeleteTask, onDeleteCategory, onEditTask }) => {
  return (
    <div className="column" style={{ margin: "0 10px", minWidth: "300px" }}>
      <h3>
        {column.title} <Badge pill bg="info">{tasks.length}</Badge>
        <Button variant="outline-danger" size="sm" style={{ float: "right", border: 'none' }} onClick={onDeleteCategory}>
          <FaTrash />
        </Button>
      </h3>
      <Droppable droppableId={column.id}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="task-list"
            style={{ backgroundColor: "#f4f5f7", padding: "10px", borderRadius: "5px", minHeight: "100px", maxHeight: "400px", overflowY: "auto" }}
          >
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="task-card"
                    style={{ marginBottom: "10px", ...provided.draggableProps.style }}
                    onDoubleClick={() => onEditTask(task.id)} // Ajout de l'événement de double-clic
                  >
                    <Tache task={task} onDelete={() => onDeleteTask(column.id, task.id)} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Button variant="primary" onClick={onAddTask} style={{ marginTop: "10px" }}>
        Nouvelle Tâche
      </Button>
    </div>
  );
};

export default Categorie;
