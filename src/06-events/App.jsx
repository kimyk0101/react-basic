function Header(props) {
  //  title, onChangeMode
  console.log("props", props);
  return (
    <header>
      <h1>
        {/* 클릭 이벤트 부착 */}
        <a
          href="/"
          onClick={(event) => {
            event.preventDefault(); //  이벤트 기본 동작 막음(폼 전송전에 막을 때도 사용)
            props.onChangeMode();
          }}
        >
          {props.title}
        </a>
      </h1>
    </header>
  );
}

function Nav(props) {
  const lis = [];
  for (let i = 0; i < props.topics.length; i++) {
    let t = props.topics[i];
    lis.push(
      <li key={t.id}>
        <a href={"/read/" + t.id}>{t.title}</a>
      </li>
    );
  }
  return (
    <nav>
      <ol>{lis}</ol>
    </nav>
  );
}

function Article(props) {
  return (
    <article>
      <h2>{props.title}</h2>
      {props.body}
    </article>
  );
}

function App() {
  const topics = [
    { id: 1, title: "html", body: "html is ..." },
    { id: 2, title: "css", body: "css is ..." },
    { id: 3, title: "javascript", body: "javascript is ..." },
  ];

  return (
    <div className="App">
      {/* onChangeMode 이벤트 핸들러 전달 */}
      <Header
        title="WEB"
        onChangeMode={function () {
          alert("Header");
        }}
      ></Header>
      <Nav topics={topics}></Nav>
      <Article title="Welcome" body="Hello, Web"></Article>
    </div>
  );
}

export default App;
