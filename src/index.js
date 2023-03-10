import { createStore } from "redux";
const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

// 상수 선언 for 실수 방지
const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";

//  ⚠️ 리덕스 actino 데이터는 반드시 {오브젝트 형식}으로 보내야함
// 용도에 따른 action 데이터 형식
// 1. 할 일 추가할 때
const addToDo = text => {
  return {
    type: ADD_TODO,
    text
  };
};

// 2. 할 일 삭제할 때
const deleteToDo = id => {
  return {
    type: DELETE_TODO,
    id
  };
};

// state의 default는 빈 리스트
// action
// reducer : 이전 state를 받아와서 새 state를 리턴하는 상태 관리 함수
const reducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      const newToDo = { text: action.text, id: Date.now() };
      return [newToDo, ...state];
    case DELETE_TODO:
      const cleanedToDo = state.filter(toDo => toDo.id !== action.id); // 삭제할 id가 아닌 것만 남기기
      return cleanedToDo;
    default:
      return state;
  }
};

// 상태(변화하는 데이터) 저장 공간 store
const store = createStore(reducer);

const dispatchAddToDo = text => {
  store.dispatch(addToDo(text));
  // store.dispatch(action): reducer에게 action을 파라미터로 전달 -> 액션을 발생시킴
};

const dispatchDeleteToDo = e => {
  const id = parseInt(e.target.parentNode.id);
  store.dispatch(deleteToDo(id));
};

const paintToDos = () => {
  // toDos에 store의 할 일 리스트[]를 받아옴
  const toDos = store.getState();
  ul.innerHTML = "";
  toDos.forEach(toDo => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.innerText = "DEL";
    btn.addEventListener("click", dispatchDeleteToDo);
    li.id = toDo.id;
    li.innerText = toDo.text;
    li.appendChild(btn);
    ul.appendChild(li);
  });
};

store.subscribe(paintToDos);
// store.subscribe('함수') : store를 구독(subscribe)하고 있기 때문에 store의 action이 dispatch될 때마다 '함수'가 호출됨

// 입력된 할 일 표시란에 추가
const onSubmit = e => {
  e.preventDefault();
  const toDo = input.value;
  input.value = "";
  dispatchAddToDo(toDo);
};
form.addEventListener("submit", onSubmit);