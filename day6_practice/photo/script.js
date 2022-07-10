// 요소 선택
const beginning = document.getElementById("beginning")
const callBtn = document.getElementById("call-btn")
const prevBtn = document.getElementById("prev")
const nextBtn = document.getElementById("next")
const photoDiv = document.getElementById("photo")

// 사용 데이터 선언
const photos = []
const numOfPhoto = 20 // 50까지만 가능!
let photoIndex = 0 // 현재 보고 있는 사진의 인덱스 번호 
const request = new XMLHttpRequest()
const api = `https://dog.ceo/api/breeds/image/random/${numOfPhoto}`
let isPushed = false // 버튼 중복 클릭을 방지하기 위한 변수 

// 응답이 로드되었을 때의 이벤트 핸들링
request.addEventListener("load", function(){
  const responseJson = JSON.parse(request.responseText)

  // 배열에다가 사진 쌓기 작업
  responseJson.message.forEach(function(element){
    photos.push(element)
  })

  photoDiv.style.backgroundImage = `url(${photos[photoIndex]})`
})

// callPhotos 함수 - 요청 초기화 
function callPhotos(){
  request.open("GET", api)
  request.send()
}

// CALL 버튼 클릭 이벤트 핸들링
callBtn.addEventListener("click", function(){
  if(isPushed){
    return; 
    // 이미 버튼이 눌려진 상태에서 또 누른 거라면, 이 함수는 강제종료!
  }
  isPushed = true;

  callPhotos()

  setTimeout(function(){   //==> 몇 미리세크 후에 어떤 동작을 할 것인지setTimeout(윈도우 메서드), 버튼을 클릭하면 사진을 불러오고 1.5초후에 begging은 지운다
                          //==>즉 call버튼을 누르면 1.5초 뒤에 사진이 불러 오고 call부분의 디자인은 지워질 것이다.
    // 비기닝 클래스 제거하면 안 보일 예정 (no-photo의 영향)
    beginning.classList.remove("beginning")
  }, 1500)
})

// prev와 next 버튼 클릭 이벤트 핸들링 
prevBtn.addEventListener("click", function(){
  
  if(photoIndex == 0){
    photoIndex = numOfPhoto - 1 // 반대편 끝번호로 인덱스를 셋팅
    photoDiv.style.backgroundImage = `url(${photos[photoIndex]})`
    return;
  }

  photoIndex -= 1
  photoDiv.style.backgroundImage = `url(${photos[photoIndex]})`
})

nextBtn.addEventListener("click", function(){
    
  if(photoIndex == numOfPhoto - 1){
    photoIndex = 0
    photoDiv.style.backgroundImage = `url(${photos[photoIndex]})`
    return;
  }

  photoIndex += 1
  photoDiv.style.backgroundImage = `url(${photos[photoIndex]})`
})