import "./PageState.css";

function PageState({ title = "", message, action = null }) {
  return (
    <section className="page-state">
      {title ? <h2 className="page-state-title">{title}</h2> : null}
      <p className="page-state-message">{message}</p>
      {action}
    </section>
  );
}

export default PageState;
