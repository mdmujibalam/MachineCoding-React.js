function Toast({
  type = "success",
  onDelete = () => {},
  message = "This is a success toast",
}) {
  return (
    <div className={`${type} toast-item`}>
      {message}{" "}
      <span className="cross-btn" onClick={() => onDelete()}>
        x
      </span>
    </div>
  );
}

export default Toast;
