import { useState } from "react";
import Header from "/src/components/Header.jsx";
import Nav from "/src/components/Nav.jsx";
import Article from "../components/Article.jsx";
import Create from "../components/Create.jsx";
import Update from "../components/Update.jsx";

function App() {
  const [mode, setMode] = useState("WELCOME");
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(4);
  const [topics, setTopics] = useState([
    { id: 1, title: "html", body: "html is ..." },
    { id: 2, title: "css", body: "css is ..." },
    { id: 3, title: "javascript", body: "javascript is ..." },
  ]);

  let content = null; //  동적 콘텐츠
  let contextControl = null; //  Update, Delete 버튼을 표시하기 위한 변수
  if (mode === "WELCOME") {
    content = <Article title="Welcome" body="Hello, Web"></Article>;
  } else if (mode === "READ") {
    let title,
      body = null;
    for (let i = 0; i < topics.length; i++) {
      console.log(topics[i].id, id);
      if (topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Article title={title} body={body}></Article>;
    //  contextControl은 READ 모드일 때만 노출
    //  <></>: Fragment -> 노드들을 단일 루트 로드로 묶기 위한 용도
    contextControl = (
      <>
        <li>
          <a
            href={"/update" + id}
            onClick={(event) => {
              event.preventDefault(); //  이벤트 기본 동작 중지
              setMode("UPDATE"); //  mode를 UPDATE로 변경
            }}
          >
            Update
          </a>
        </li>
        <li>
          <input
            type="button"
            value="delete"
            onClick={() => {
              //    현재 선택된 topic id를 가진 요소를 삭제
              const newTopics = topics.filter((topic) => topic.id !== id);
              setTopics(newTopics);
              setMode("WELCOME");
            }}
          />
        </li>
      </>
    );
  } else if (mode === "CREATE") {
    content = (
      <Create
        onCreate={(_title, _body) => {
          const newTopic = { id: nextId, title: _title, body: _body };
          const newTopics = [...topics];
          newTopics.push(newTopic);
          setTopics(newTopics);
          setMode("READ");
          setId(nextId);
          setNextId(nextId + 1);
        }}
      ></Create>
    );
  } else if (mode === "UPDATE") {
    //  현재 선택된 topic의 title, body
    let title = null,
      body = null;
    for (let i = 0; i < topics.length; i++) {
      if (topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = (
      <Update
        title={title}
        body={body}
        onUpdate={(title, body) => {
          console.log(title, body);
          //    topics Update
          const newTopics = [...topics]; //  새 배열 생성
          const updatedTopic = { id: id, title: title, body: body };
          for (let i = 0; i < newTopics.length; i++) {
            if (newTopics[i].id === id) {
              newTopics[i] = updatedTopic;
              break;
            }
          }
          setTopics(newTopics);
          setMode("READ");
        }}
      ></Update>
    );
  }

  return (
    <div className="App">
      <Header
        title="WEB"
        onChangeMode={() => {
          setMode("WELCOME");
        }}
      ></Header>
      <Nav
        topics={topics}
        onChangeMode={(_id) => {
          setMode("READ");
          setId(_id);
        }}
      ></Nav>
      {content}
      <ul>
        <li>
          <a
            href="/create"
            onClick={(event) => {
              event.preventDefault();
              setMode("CREATE");
            }}
          >
            Create
          </a>
        </li>
        {/* Update, Delete 메뉴는 READ 모드일 때만 노출 */}
        {/* <a href="/update">Update</a> */}
        {contextControl}
      </ul>
    </div>
  );
}

export default App;
