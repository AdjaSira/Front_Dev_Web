import React, { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { Button, Modal, Form } from "react-bootstrap";
import Categorie from "./Categorie";

const initialProjects = {
  "project-1": {
    id: "project-1",
    name: "Projet 1",
    data: {
      tasks: {
        "task-1": { id: "task-1", content: "Tâche 1", description: "Description de la tâche 1", priority: "Normal" },
        "task-2": { id: "task-2", content: "Tâche 2", description: "Description de la tâche 2", priority: "Important" },
      },
      columns: {
        "column-1": { id: "column-1", title: "À faire", taskIds: ["task-1", "task-2"] },
        "column-2": { id: "column-2", title: "En cours", taskIds: [] },
      },
      columnOrder: ["column-1", "column-2"],
    }
  },
  "project-2": {
    id: "project-2",
    name: "Projet 2",
    data: {
      tasks: {
        "task-1": { id: "task-1", content: "Tâche Fatigue", description: "Description de la tâche Fatigue", priority: "Normal" },
        "task-2": { id: "task-2", content: "Tâche Epuise", description: "Description de la tâche Epuise", priority: "Important" },
      },
      columns: {
        "column-1": { id: "column-1", title: "Mon etat", taskIds: ["task-1", "task-2"] },
        "column-2": { id: "column-2", title: "En cours", taskIds: [] },
      },
      columnOrder: ["column-1", "column-2"],
    }
  },
  // Ajoutez d'autres projets ici
};

const KanbanBoard = ({ selectedProjectId }) => {
  const [projects, setProjects] = useState(initialProjects);
  const [data, setData] = useState(initialProjects[selectedProjectId].data);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [showAddColumnModal, setShowAddColumnModal] = useState(false);
  const [newTaskContent, setNewTaskContent] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState("Normal");
  const [selectedColumnId, setSelectedColumnId] = useState("");
  const [newColumnTitle, setNewColumnTitle] = useState("");
  const [editableTask, setEditableTask] = useState(null);  // To handle task editing

  useEffect(() => {
    if (selectedProjectId && projects[selectedProjectId]) {
      setData(projects[selectedProjectId].data);
    }
  }, [selectedProjectId, projects]);

  const handleAddTask = () => {
    const newTaskId = `task-${Object.keys(data.tasks).length + 1}`;
    const newTask = { id: newTaskId, content: newTaskContent, description: newTaskDescription, priority: newTaskPriority };

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
    setNewTaskDescription("");
    setNewTaskPriority("Normal");
    setSelectedColumnId("");
    setShowAddTaskModal(false);

    const updatedProjects = {
      ...projects,
      [selectedProjectId]: {
        ...projects[selectedProjectId],
        data: newState
      }
    };
    setProjects(updatedProjects);
  };

  const handleAddColumn = () => {
    const newColumnId = `column-${Object.keys(data.columns).length + 1}`;
    const newColumn = {
      id: newColumnId,
      title: newColumnTitle,
      taskIds: [],
    };

    const newState = {
      ...data,
      columns: {
        ...data.columns,
        [newColumnId]: newColumn,
      },
      columnOrder: [...data.columnOrder, newColumnId],
    };

    setData(newState);
    setNewColumnTitle("");
    setShowAddColumnModal(false);

    const updatedProjects = {
      ...projects,
      [selectedProjectId]: {
        ...projects[selectedProjectId],
        data: newState
      }
    };
    setProjects(updatedProjects);
  };

  const handleDeleteTask = (columnId, taskId) => {
    const newTaskIds = Array.from(data.columns[columnId].taskIds).filter(id => id !== taskId);
    const newColumn = {
      ...data.columns[columnId],
      taskIds: newTaskIds,
    };

    const newTasks = { ...data.tasks };
    delete newTasks[taskId];

    const newState = {
      ...data,
      tasks: newTasks,
      columns: {
        ...data.columns,
        [columnId]: newColumn,
      },
    };

    setData(newState);

    const updatedProjects = {
      ...projects,
      [selectedProjectId]: {
        ...projects[selectedProjectId],
        data: newState
      }
    };
    setProjects(updatedProjects);
  };

  const handleDeleteCategory = (columnId) => {
    const newColumns = { ...data.columns };
    delete newColumns[columnId];

    const newColumnOrder = data.columnOrder.filter(id => id !== columnId);

    const newState = {
      ...data,
      columns: newColumns,
      columnOrder: newColumnOrder,
    };

    setData(newState);

    const updatedProjects = {
      ...projects,
      [selectedProjectId]: {
        ...projects[selectedProjectId],
        data: newState
      }
    };
    setProjects(updatedProjects);
  };

  const handleEditTask = (taskId, newContent, newDescription, newPriority) => {
    const newTask = { ...data.tasks[taskId], content: newContent, description: newDescription, priority: newPriority };
    const newTasks = { ...data.tasks, [taskId]: newTask };
    const newState = { ...data, tasks: newTasks };
    setData(newState);

    const updatedProjects = {
      ...projects,
      [selectedProjectId]: {
        ...projects[selectedProjectId],
        data: newState
      }
    };
    setProjects(updatedProjects);
  };

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

      const updatedProjects = {
        ...projects,
        [selectedProjectId]: {
          ...projects[selectedProjectId],
          data: newState
        }
      };
      setProjects(updatedProjects);

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

    const updatedProjects = {
      ...projects,
      [selectedProjectId]: {
        ...projects[selectedProjectId],
        data: newState
      }
    };
    setProjects(updatedProjects);
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="kanban-board" style={{ display: "flex", overflowX: "auto" }}>
          {data.columnOrder.map((columnId) => {
            const column = data.columns[columnId];
            const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);

            return (
              <Categorie
                key={column.id}
                column={column}
                tasks={tasks}
                onAddTask={() => {
                  setSelectedColumnId(column.id);
                  setShowAddTaskModal(true);
                }}
                onDeleteTask={handleDeleteTask}
                onDeleteCategory={() => {
                  if (window.confirm("Êtes-vous sûr de vouloir supprimer cette catégorie ?")) {
                    handleDeleteCategory(column.id);
                  }
                }}
                onEditTask={(taskId) => {
                  setEditableTask(data.tasks[taskId]);
                  setNewTaskContent(data.tasks[taskId].content);
                  setNewTaskDescription(data.tasks[taskId].description);
                  setNewTaskPriority(data.tasks[taskId].priority);
                  setShowAddTaskModal(true);
                }}
              />
            );
          })}
        </div>
      </DragDropContext>

      <Button
        variant="success"
        style={{ position: "fixed", bottom: "20px", right: "20px", borderRadius: "50%" }}
        onClick={() => setShowAddColumnModal(true)}
      >
        +
      </Button>

      {/* Modal for Adding or Editing Task */}
      <Modal show={showAddTaskModal} onHide={() => {
        setShowAddTaskModal(false);
        setEditableTask(null);
        setNewTaskContent("");
        setNewTaskDescription("");
        setNewTaskPriority("Normal");
      }}>
        <Modal.Header closeButton>
          <Modal.Title>{editableTask ? "Modifier la tâche" : "Ajouter une nouvelle tâche"}</Modal.Title>
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
            <Form.Group controlId="formTaskDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Entrez la description de la tâche"
                value={newTaskDescription}
                onChange={(e) => setNewTaskDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formTaskPriority">
              <Form.Label>Priorité</Form.Label>
              <Form.Control
                as="select"
                value={newTaskPriority}
                onChange={(e) => setNewTaskPriority(e.target.value)}
              >
                <option>Urgent</option>
                <option>Important</option>
                <option>Normal</option>
                <option>Facultative</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {
            setShowAddTaskModal(false);
            setEditableTask(null);
            setNewTaskContent("");
            setNewTaskDescription("");
            setNewTaskPriority("Normal");
          }}>
            Annuler
          </Button>
          <Button 
            variant="primary" 
            onClick={() => {
              if (editableTask) {
                handleEditTask(editableTask.id, newTaskContent, newTaskDescription, newTaskPriority);
              } else {
                handleAddTask();
              }
              setEditableTask(null);
              setNewTaskContent("");
              setNewTaskDescription("");
              setNewTaskPriority("Normal");
            }}
          >
            {editableTask ? "Modifier" : "Ajouter"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for Adding Column */}
      <Modal show={showAddColumnModal} onHide={() => setShowAddColumnModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter une nouvelle catégorie</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formColumnTitle">
              <Form.Label>Titre de la catégorie</Form.Label>
              <Form.Control
                type="text"
                placeholder="Entrez le titre de la catégorie"
                value={newColumnTitle}
                onChange={(e) => setNewColumnTitle(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddColumnModal(false)}>
            Annuler
          </Button>
          <Button variant="primary" onClick={handleAddColumn}>
            Ajouter
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default KanbanBoard;
