import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Card, Button, Modal, Form } from "react-bootstrap";

const initialData = {
  tasks: {
    "task-1": { id: "task-1", content: "Tâche 1" },
    "task-2": { id: "task-2", content: "Tâche 2" },
    "task-3": { id: "task-3", content: "Tâche 3" },
    "task-4": { id: "task-4", content: "Tâche 4" },
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "À faire",
      taskIds: ["task-1", "task-2", "task-3", "task-4"],
    },
    "column-2": {
      id: "column-2",
      title: "En cours",
      taskIds: [],
    },
    "column-3": {
      id: "column-3",
      title: "Terminé",
      taskIds: [],
    },
  },
  columnOrder: ["column-1", "column-2", "column-3"],
};

const KanbanBoard = () => {
  const [data, setData] = useState(initialData);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [newTaskContent, setNewTaskContent] = useState("");
  const [selectedColumnId, setSelectedColumnId] = useState("");
  const [currentTask, setCurrentTask] = useState(null);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = data.columns[source.droppableId];
    const finish = data.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      const newState = {
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn,
        },
      };

      setData(newState);
      return;
    }

    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newState = {
      ...data,
      columns: {
        ...data.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };

    setData(newState);
  };

  const handleAddTask = () => {
    const newTaskId = `task-${Object.keys(data.tasks).length + 1}`;
    const newTask = { id: newTaskId, content: newTaskContent };

    const newTasks = {
      ...data.tasks,
      [newTaskId]: newTask,
    };

    const newTaskIds = Array.from(data.columns[selectedColumnId].taskIds);
    newTaskIds.push(newTaskId);

    const newColumn = {
      ...data.columns[selectedColumnId],
      taskIds: newTaskIds,
    };

    const newState = {
      ...data,
      tasks: newTasks,
      columns: {
        ...data.columns,
        [newColumn.id]: newColumn,
      },
    };

    setData(newState);
    setNewTaskContent("");
    setSelectedColumnId("");
    setShowAddModal(false);
  };

  const handleEditTask = () => {
    const updatedTask = {
      ...data.tasks[currentTask.id],
      content: newTaskContent,
    };

    const newTasks = {
      ...data.tasks,
      [currentTask.id]: updatedTask,
    };

    const newState = {
      ...data,
      tasks: newTasks,
    };

    setData(newState);
    setCurrentTask(null);
    setNewTaskContent("");
    setShowEditModal(false);
  };

  const openEditModal = (task) => {
    setCurrentTask(task);
    setNewTaskContent(task.content);
    setShowEditModal(true);
  };

  const openDetailModal = (task) => {
    setCurrentTask(task);
    setShowDetailModal(true);
  };

  const handleColumnChange = (e) => {
    setSelectedColumnId(e.target.value);
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="kanban-board">
          {data.columnOrder.map((columnId) => {
            const column = data.columns[columnId];
            const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);

            return (
              <div key={column.id} className="column">
                <h3>{column.title}</h3>
                <Droppable droppableId={column.id}>
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="task-list"
                    >
                      {tasks.map((task, index) => (
                        <Draggable
                          key={task.id}
                          draggableId={task.id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="task-card"
                              onClick={() => openDetailModal(task)}
                              onDoubleClick={() => openEditModal(task)}
                            >
                              <Card>
                                <Card.Body>{task.content}</Card.Body>
                              </Card>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
                <Button
                  variant="primary"
                  onClick={() => {
                    setSelectedColumnId(column.id);
                    setShowAddModal(true);
                  }}
                >
                  Nouvelle Tâche
                </Button>
              </div>
            );
          })}
        </div>
      </DragDropContext>

      {/* Modal for Adding Task */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter une nouvelle tâche</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTaskContent">
              <Form.Label>Contenu de la tâche</Form.Label>
              <Form.Control
                type="text"
                placeholder="Entrez le contenu de la tâche"
                value={newTaskContent}
                onChange={(e) => setNewTaskContent(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formTaskColumn">
              <Form.Label>Colonne</Form.Label>
              <Form.Control
                as="select"
                value={selectedColumnId}
                onChange={handleColumnChange}
              >
                {data.columnOrder.map((columnId) => (
                  <option key={columnId} value={columnId}>
                    {data.columns[columnId].title}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Annuler
          </Button>
          <Button variant="primary" onClick={handleAddTask}>
            Ajouter
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for Editing Task */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier la tâche</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formEditTaskContent">
              <Form.Label>Contenu de la tâche</Form.Label>
              <Form.Control
                type="text"
                placeholder="Entrez le nouveau contenu de la tâche"
                value={newTaskContent}
                onChange={(e) => setNewTaskContent(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Annuler
          </Button>
          <Button variant="primary" onClick={handleEditTask}>
            Enregistrer
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for Task Details */}
      <Modal show={showDetailModal} onHide={() => setShowDetailModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Détails de la tâche</Modal.Title>
        </Modal.Header>
        <Modal.Body>{currentTask && <p>{currentTask.content}</p>}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDetailModal(false)}>
            Fermer
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default KanbanBoard;
