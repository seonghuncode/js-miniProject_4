//우선 html파일 에서 날짜, 시간을 가지고 class or id명으로 불러 온다
const day = document.getElementById("day");
const time = document.getElementById("time");

//현재 시간으로 환산해주는 함수를 만든다.
function clock(){

    //now라는 변수를 만들어서 Date함수를 불러 온다
    let now = new Date();

    let year = now.getFullYear();
    let month = now.getMonth() + 1 ;
    let daytime = now.getDay();

    let hour = now.getHours();
    let minutes = now.getMinutes();
    let second = now.getSeconds();

    //출렬 할때 한자리일 경우 앞에 0을 붙이는 기능 추가
    month = month < 10? `0${month}` : month;
    daytime = daytime < 10? `0${daytime}` : daytime;
    hour = hour < 10? `0${hour}` : hour;
    minutes = minutes < 10? `0${minutes}` : minutes;
    second = second < 10? `0${second}` : second;

    day.textContent = `${year}년 ${month}월 ${daytime}일 `;
    time.textContent = `${hour}시 ${minutes}분 ${second}초`;


}


//만든 함수를 실행 시키고 1초 단위로 업데이트 해준다.
clock();
setInterval(clock, 1000); //마이크로 세컨즈 단위


