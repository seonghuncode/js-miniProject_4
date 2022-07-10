// // https://dog.ceo/api/breeds/image/random
// //https://dog.ceo/api/breed/Husky/images/random



// const request = new XMLHttpRequest()  //request객체를 만든다


// //보낼 요청을 초기화 한다(요청 세팅)
// request.open("GET", "https://dog.ceo/api/breed/husky/images/random")   //get은 서버에서 데이터를 가지고 온다, post는 붙이는 것


// //세팅한 요청 보내기
// request.send()


// //응답이 왔을때 어떻게 할지 정하기
// request.addEventListener("load", function(response){  //load응답을 받아왔다는 이벤트가 발생하면 어떻게 할지 이벤트 핸들링을 하는 과정

    
//     console.log(response)
//     console.log(request.response)  //요청 객체 한테 응답이 주어진다 ==> //응답 객체 안에 있는 실제 필요한 정보만 보기
//     console.log(JSON.parse(request.response))
// })

// //-==> 요청을 보내면 load이벤트가 발생하면 응답한다








//---------------------------------------------------------------------------------------------------------------------------------------






/* 
오픈 소스 API, DOG API 를 사용했다!
여기에서 API란 뭘까?

API (Application Programming Interface) :
프로그램이나 웹을 개발할 때 사용할 수 있는 자원을 제공하기 위해 만든
URL이나 소스 코드 따위를 통칭하는 말. 
*/

const dogBtn = document.getElementById("dog-btn")
const request = new XMLHttpRequest()

// 요청에 대한 응답이 왔다, 라는 이벤트!
request.addEventListener("load", function(){
  
  // 응답 결과가 담겨있는 속성!
  console.log(request.responseText)

  // 응답 결과 문자열을 객체로 변환해서 처리하고파!
  const result = JSON.parse(request.responseText)
  console.log(result.message)   //==> 콘솔에 나오는 문자열은 원하는 부분에 띠로 접근이 불가능 하다 예로 message하지만 json의 경우는 바로 message에 접근이 가능하도록 기능을
                                //지원하기 때문에 변환한 것이다

  const img = document.createElement("img")
  img.src = result.message
  document.body.appendChild(img)
})

dogBtn.addEventListener("click", function(){
  request.open("GET", "https://dog.ceo/api/breeds/image/random")
  request.send()
})



