//배열이 바뀌며누 다시 저장해 주는 작업을 반복한다
//미니 프로젝트 할일 목록 코드 보면서 스타일링 변경 하기
//17시 20분 까지 혼자 코드 분석 + 질문
//17:20분에 코드 다시 설명
//그런 다음 다시 질문 하면서 각자 스타일링 하기



// 요소 선택 및 배열 선언
const todoList = document.getElementById('todo-list') //리스트를 보여줄 html의 tag
const todoForm = document.getElementById('todo-form') //form tag
let todoArr = []; // 할일을 관리하기 위해!

// displayTodos 함수  ==> 할일 하나하나를 다시 그리는 작업을 한다.
function displayTodos(){ 
  todoList.innerHTML = "" // 최신 상태에서 다시 그리려고 싹 지움 
  todoArr.forEach(function(aTodo){   //할일 하나하나 접근 aTodo는 배열 안에서 온다.
    //만약 배열에 두개가 있으면 두번 호출 forEach를 다시 보고 이해하고 오기(하나하나에 접근을 할때 값을 대변할 대변인을 매개변수인 aTodo로 한다는 의미)
    const todoItem = document.createElement('li') // 말풍선
    const todoDelBtn = document.createElement('span') // 말풍선 옆에 X
    todoDelBtn.innerText = 'x'
    todoDelBtn.title = '클릭시 삭제'  //html에 title 속성을 자바스크립트 에서 추가 해주는 작업 // 여기서 title이란 마우스 커스를 올리고 있으면 클릭시 삭제라는 문구가 나오게 하는기능
    todoItem.innerText = aTodo.todoText
    todoItem.title = '클릭시 완료'
    todoItem.classList.add(aTodo.todoDone ? 'done' : 'yet')  //말풍선의 색을 정하기 위해 속성을 추가 해준다. todoDone의 속성에 띠리 done or yet으로 
    todoItem.appendChild(todoDelBtn) // li 에 span 추가

    // x 버튼 눌렀을 때의 동작 정의
    todoDelBtn.addEventListener('click', function(){
      handleTodoDelBtnClick(aTodo.todoId) // 눌린 할일의 id를 전달!
    })

    // 말풍선 눌렀을 때의 동작 정의 
    todoItem.addEventListener('click', function(){
      handleTodoItemClick(aTodo.todoId) // 눌린 할일의 id를 전달!
    })

    todoList.appendChild(todoItem) // ul 에 li 추가 
  });
}

// handleTodoDelBtnClick 함수
// 내가 누른 애 빼고 나머지만 남긴다!
function handleTodoDelBtnClick(clickedId){
  todoArr = todoArr.filter(function(aTodo){
    return aTodo.todoId !== clickedId //아이디가 다른 애들이 있으면
  })
  displayTodos() // 남은 애들로 다시 그린다!
  saveTodos()
}

// handleTodoItemClick 함수 (아이디를 받아서 활용)
function handleTodoItemClick(clickedId){
  todoArr = todoArr.map(function(aTodo){

    // 클릭한 아이디를 선별하는 과정!
    // ! 연산자 : true를 false 로, false를 true로 변경!
    return aTodo.todoId !== clickedId ?  //
    aTodo : 
    { ...aTodo, todoDone: !aTodo.todoDone } 
  })
  displayTodos() // 변경된 상태에서 다시 그린다!
  saveTodos()
}

// saveTodos 함수 : 저장한다!
function saveTodos(){
  const todoSting = JSON.stringify(todoArr)
  localStorage.setItem('myTodos', todoSting)
}

// loadTodos 함수 : 패이지 열릴때 딱 한번만 사용한다.
// 로컬스토리지에 저장된 것들 가져와서 보여주기!  ==> 로컬 스토리지에 저장된 것을 가지고 오는 것
function loadTodos(){
  const myTodos = localStorage.getItem('myTodos') // 문자열밖에 안온다!
  todoArr = myTodos !== null ? JSON.parse(myTodos) : todoArr  //==> 실제로 존재 하면 해석해서 그린닫. 존재 하지 않으면 빈 배열을 사용
  displayTodos() // 가져온 값들로 새로 그리기
}



//여기서 부터 프로그램이 실행 되므로 이 코드를먼저 본다.!!!!!!!!!

// 할일 입력 후 제출하면 발생하는 이벤트 다루기
todoForm.addEventListener('submit', function(e){
  e.preventDefault() // 원래 있는 기능은 사용하지 않겠다는 선언!

  // 새로 추가될 할일 객체
  // todoId : 이 객체만이 가지고 있는 고유한 값(식별을 위한)
  const toBeAdded = {
    todoText: todoForm.todo.value,
    todoId: new Date().getTime(),  //고유한 값인 시간 정보를 id로 만들었다.
    todoDone: false
  }
  todoForm.todo.value = "" 
  // <input name="todo" type="text" placeholder="TO DO..." maxlength="16" autocomplete="off"><input type="submit" value="추가">여기에 접근해서
  //입력창에 적혀 있는 내용 지우기 (버튼을 눌렀을때 입력창에 작성한 내용은 지워지고 추가하게 되는 기능)
  todoArr.push(toBeAdded) //배열에 할일 객체를 하나하나 추가 한다.
  displayTodos() // 현재 배열의 상태에서 할일 표시하기 ,, 배열의 상태가 바뀔때 마다 다시 한다.
  saveTodos()       //그리고 다시 저장 한다.
})

loadTodos() // 시작할 때 한번만!