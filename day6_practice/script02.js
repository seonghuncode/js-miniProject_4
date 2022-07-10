

const url = "https://dog.ceo/api/breeds/image/random/8"
const dogBtn = document.getElementById("dog-btn")
const request = new XMLHttpRequest()

request.addEventListener("load", function(){
  const result = JSON.parse(request.responseText)  //요청 객체 안에는 응답 객체가 들어온다 사용하기 위해서는 객체로 바꾸어 주어야 한다(문자열은 읽을 수 없다)
  console.log(result)
  const imageArray = result.message
  
  imageArray.forEach(function(image){  //한번씩 똑같은 처리를 할때
    const img = document.createElement("img")
    img.src = image
    img.width = 200
    img.height = 200
    document.body.appendChild(img)
  })
})

dogBtn.addEventListener("click", function(){
  const numberInput  = document.querySelector("input")
  request.open("GET", `https://dog.ceo/api/breeds/image/random/${numberInput.value}`)   //보낼때 조작해 준다
  request.send()
})
