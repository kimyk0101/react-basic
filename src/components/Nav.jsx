import PropTypes from "prop-types";
function Nav({ topics, onChangeMode }) {
  //  title, onChangeMode

  return (
    <nav>
      <ol>
        {topics.map((topic) => (
          <li key={topic.id}>
            <a
              id={topic.id}
              href={"/read/" + topic.id}
              onClick={(event) => {
                event.preventDefault();
                onChangeMode(Number(event.target.id));
              }}
            >
              {topic.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
Nav.propTypes = {
  topics: PropTypes.array,
  onChangeMode: PropTypes.func,
};
export default Nav;
