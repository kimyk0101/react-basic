import PropTypes from "prop-types";
function Header({ title, onChangeMode }) {
  return (
    <header>
      <h1>
        <a
          href="/"
          onClick={(event) => {
            event.preventDefault();
            onChangeMode();
          }}
        >
          {title}
        </a>
      </h1>
    </header>
  );
}
Header.propTypes = {
  title: PropTypes.string,
  onChangeMode: PropTypes.func,
};
export default Header;
