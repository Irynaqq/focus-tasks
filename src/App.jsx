import { useMemo, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Header from "./components/Header";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import IdleWatcher from "./components/IdleWatcher";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [focusMode, setFocusMode] = useState(false);

  const stats = useMemo(() => {
    const total = tasks.length;
    const done = tasks.filter((t) => t.done).length;
    return { total, done };
  }, [tasks]);

  const addTask = (title) => {
    const trimmed = title.trim();
    if (!trimmed) {
      toast.error("Task title cannot be empty");
      return;
    }

    const newTask = {
      id: crypto.randomUUID(),
      title: trimmed,
      done: false,
      createdAt: Date.now(),
    };

    setTasks((prev) => [newTask, ...prev]);
    toast.success("Task added");
  };

  const toggleDone = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const removeTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    toast.info("Task removed");
  };

  const clearDone = () => {
    const doneCount = tasks.filter((t) => t.done).length;
    if (doneCount === 0) {
      toast.warning("No completed tasks to clear");
      return;
    }
    setTasks((prev) => prev.filter((t) => !t.done));
    toast.success(`Cleared ${doneCount} completed task(s)`);
  };

  const toggleFocusMode = () => {
    const next = !focusMode;
    setFocusMode(next);

    toast(next ? "Focus mode enabled" : "Focus mode disabled", {
      toastId: "focus-mode-toggle",
      type: "default",
    });
  };

  return (
    <div className="page">
      <div className="container">
        <div className="card">
          <Header
            total={stats.total}
            done={stats.done}
            focusMode={focusMode}
            onToggleFocus={toggleFocusMode}
            onClearDone={clearDone}
          />
        </div>

        <IdleWatcher
          focusMode={focusMode}
          onIdle={() => toast.warning("You seem idle. Need a break?")}
          onActive={() => toast.success("Welcome back!")}
        />

        <div className="card">
          <TaskForm onAdd={addTask} disabled={focusMode && stats.total > 0} />
        </div>

        <div className="card section">
          <TaskList
            tasks={tasks}
            focusMode={focusMode}
            onToggleDone={toggleDone}
            onRemove={removeTask}
          />
        </div>

        <ToastContainer position="bottom-right" autoClose={2500} theme="dark" />
      </div>
    </div>
  );
}
