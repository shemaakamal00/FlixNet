import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__copy">
        © {new Date().getFullYear()} FlixNet — Gruppuppgift
      </p>
    </footer>
  );
}

export default Footer;
