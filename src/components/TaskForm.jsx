import { useState } from "react";
import { FaPlus } from "react-icons/fa6";

export default function TaskForm({ onAdd, disabled }) {
  const [value, setValue] = useState("");

  const submit = (e) => {
    e.preventDefault();
    onAdd(value);
    setValue("");
  };

  return (
    <form className="card form" onSubmit={submit}>
      <label className="label">
        New task
        <div className="form__row">
          <input
            className="input"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Write something…"
            disabled={disabled}
          />
          <button className="btn btn--primary" type="submit" disabled={disabled}>
            <FaPlus className="icon" />
            Add
          </button>
        </div>
      </label>

      {disabled ? (
        <p className="muted">
          Focus mode: adding tasks is disabled while you have tasks in the list.
        </p>
      ) : null}
    </form>
  );
}
