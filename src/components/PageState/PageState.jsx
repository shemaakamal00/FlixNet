import "./PageState.css";

function PageState({ title = "", message, action = null }) {
  return (
    <section className="page-state">
      {title ? <h2 className="page-state__title">{title}</h2> : null}
      <p className="page-state__message">{message}</p>
      {action}
    </section>
  );
}

export default PageState;
