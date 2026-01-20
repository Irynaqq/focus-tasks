import { FaTrash, FaCircleCheck, FaRegCircle } from "react-icons/fa6";

export default function TaskList({ tasks, focusMode, onToggleDone, onRemove }) {
  return (
    <section className="card">
      <h2 className="h2">Tasks</h2>

      {tasks.length === 0 ? (
        <p className="muted">No tasks yet. Add your first one.</p>
      ) : (
        <ul className={`list ${focusMode ? "list--focus" : ""}`}>
          {tasks.map((t) => (
            <li key={t.id} className="list__item">
              <button className="iconbtn" onClick={() => onToggleDone(t.id)} title="Toggle done">
                {t.done ? <FaCircleCheck className="icon ok" /> : <FaRegCircle className="icon" />}
              </button>

              <span className={`task ${t.done ? "task--done" : ""}`}>{t.title}</span>

              <button className="iconbtn danger" onClick={() => onRemove(t.id)} title="Remove">
                <FaTrash className="icon" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
