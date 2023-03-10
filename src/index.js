import { createStore } from "redux";
const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

// 상수 선언 for 실수 방지
const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";


const reducer = (state = [], action) => {
  console.log(action);
  switch (action.type) {
    case ADD_TODO:
      return [...state, { text: action.text, id: Date.now() }];
    case DELETE_TODO:
      return [];
    default:
      return state;
  }
};

// 상태(변화하는 데이터) 저장 공간 store
const store = createStore(reducer);

// subscribe(구독) : store의 변화를 감지할 때마다 발동되는 함수
store.subscribe(() => console.log(store.getState()));

// 입력된 할 일 표시란에 추가하기 
const onSubmit = e => {
  e.preventDefault();
  const toDo = input.value;
  input.value = "";
  store.dispatch({ type: ADD_TODO, text: toDo });
};
form.addEventListener("submit", onSubmit);