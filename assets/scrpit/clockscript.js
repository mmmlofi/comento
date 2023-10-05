document.addEventListener("DOMContentLoaded", function () {
    let alarmInterval;
    let isBlinking = false;
    let batteryLevel = 100;
    let alarms = [];

    // 시간 표시 업데이트 함수
    function updateTime() {
        const currentTime = new Date();
        const hours = currentTime.getHours().toString().padStart(2, "0");
        const minutes = currentTime.getMinutes().toString().padStart(2, "0");
        const seconds = currentTime.getSeconds().toString().padStart(2, "0");
        const timeElement = document.getElementById("digital-clock");
        const clockContainer = document.querySelector(".clock-container");

        // 배터리 레벨이 0% 이상일 때만 시간 표시
        if (batteryLevel > 0) {
            timeElement.innerHTML = `
                <div id="hour">${hours}</div>
                <div>:</div>
                <div id="minute">${minutes}</div>
                <div>:</div>
                <div id="second">${seconds}</div>
            `;
            clockContainer.classList.remove("blink"); // .blink 클래스 제거

        } else {
            clockContainer.style.backgroundColor = "black";
        }
        
        const currentAlarmTime = `${hours}:${minutes}:${seconds}`;
        if (alarms.includes(currentAlarmTime)) {
            startBlinking();
        }
    } 
    
    // 초당 시간 업데이트
    setInterval(updateTime, 1000);

    // 배터리 업데이트 함수
    function updateBatteryLevel() {
        if (batteryLevel > 0) {
            batteryLevel -= 1;
            document.getElementById("battery-level").textContent = batteryLevel;
        } 
    }

    // 1초당 배터리  감소
    setInterval(updateBatteryLevel, 1000);

    // 알람 추가 버튼 클릭 이벤트 처리
    const addAlarmButton = document.getElementById("add-alarm");
    addAlarmButton.addEventListener("click", function () {
        const alarmList = document.getElementById("alarm-list");
        if (alarmList.childElementCount < 3) {
            const alarmHour = document.getElementById("alarm-hour").value;
            const alarmMinute = document.getElementById("alarm-minute").value;
            const alarmSecond = document.getElementById("alarm-second").value;

            const alarmTime = `${alarmHour.padStart(2, "0")}:${alarmMinute.padStart(2, "0")}:${alarmSecond.padStart(2, "0")}`;
            alarms.push(alarmTime);
            const alarmItem = document.createElement("li");
            alarmItem.textContent = `알람: ${alarmTime}`;
            alarmList.appendChild(alarmItem);

            // 입력 폼 초기화
            document.getElementById("alarm-hour").value = "";
            document.getElementById("alarm-minute").value = "";
            document.getElementById("alarm-second").value = "";
        } else {
            alert("최대 3개의 알람만 추가할 수 있습니다.");
        }
    });
    
    // 알람 끄기 버튼 클릭 이벤트 처리
    const stopAlarmButton = document.getElementById("stop-alarm");
    stopAlarmButton.addEventListener("click", function () {
        stopBlinking();
        document.getElementById("digital-clock").classList.remove("blink");
        // 화면을 원래색으로 돌아가게 함
        document.querySelector(".clock-container").style.backgroundColor = "#f6f6f6";
    });

    // 알람 실행 함수
    function startBlinking() {
        isBlinking = true;
        alarmInterval = setInterval(function () {
            const clockContainer = document.querySelector(".clock-container");
            if (isBlinking) {
                document.getElementById("digital-clock").classList.add("blink");
                clockContainer.classList.add("blink"); // .blink 클래스 추가
            } else {
                clockContainer.classList.remove("blink"); // .blink 클래스 제거
            }
            isBlinking = !isBlinking;
        }, 500);
    }
    
    // 알람 멈추기 함수
    function stopBlinking() {
        clearInterval(alarmInterval);
        const clockContainer = document.querySelector(".clock-container");
        clockContainer.classList.remove("blink"); // .blink 클래스 제거
    }
});