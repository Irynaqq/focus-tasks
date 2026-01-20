import { FaBolt, FaBroom, FaListCheck } from "react-icons/fa6";

export default function Header({ total, done, focusMode, onToggleFocus, onClearDone }) {
  return (
    <header className="header">
      <div className="header__title">
        <FaListCheck className="icon" />
        <div>
          <h1>Focus Tasks</h1>
          <p className="muted">
            Total: <b>{total}</b> · Done: <b>{done}</b>
          </p>
        </div>
      </div>

      <div className="header__actions">
        <button className="btn" onClick={onClearDone} title="Clear completed">
          <FaBroom className="icon" />
          Clear done
        </button>

        <button
          className={`btn ${focusMode ? "btn--primary" : ""}`}
          onClick={onToggleFocus}
          title="Toggle focus mode"
        >
          <FaBolt className="icon" />
          {focusMode ? "Focus ON" : "Focus OFF"}
        </button>
      </div>
    </header>
  );
}
