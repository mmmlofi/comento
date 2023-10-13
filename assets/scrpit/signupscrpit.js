function signup() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const usernameError = document.getElementById("usernameError");
    const passwordError = document.getElementById("passwordError");
    const confirmPasswordError = document.getElementById("confirmPasswordError");
    const errorMessage = document.getElementById("error-message");

    // 아이디 중복 검사
    const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
    if (existingUsers.find(user => user.username === username)) {
        usernameError.textContent = "이미 사용 중인 아이디입니다.";
        return;
    } else {
        usernameError.textContent = "";
    }

    // 비밀번호 규칙 검사 (예: 최소 8자, 대문자, 소문자, 숫자 포함)
    const rePassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!password.match(rePassword)) {
        passwordError.textContent = "비밀번호는 최소 8자, 대문자, 소문자, 숫자를 포함해야 합니다.";
        return;
    } else {
        passwordError.textContent = "";
    }

    // 비밀번호 확인 일치 검사
    if (password !== confirmPassword) {
        confirmPasswordError.textContent = "비밀번호와 일치하지 않습니다.";
        passwordError.textContent = "비밀번호와 일치하지 않습니다.";
        return;
    } else {
        confirmPasswordError.textContent = "";
    }

    // 회원 정보 저장
    existingUsers.push({ username, password });
    localStorage.setItem("users", JSON.stringify(existingUsers));

    alert("회원가입이 완료되었습니다!");
}