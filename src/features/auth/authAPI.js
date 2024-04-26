export function createUser(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8081/auth/signup", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "content-type": "application/json" },
    });
    const data = response.json();
    resolve({ data });
  });
}

export function checkUser(loginInfo) {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("logininfo", loginInfo);
      const email = loginInfo.email;
      const password = loginInfo.password;
      console.log("email", email);
      const response = await fetch("http://localhost:8081/auth/login", {
        // const response = await fetch("http://localhost:8081/auth", {
        method: "POST",
        body: JSON.stringify(loginInfo),
        headers: { "content-type": "application/json" },
      });
      if (response.ok) {
        const data = await response.json();
        console.log("matched email id ", data);
        resolve({ data });
      } else {
        const err = await response.json();
        reject({ err });
      }
    } catch (error) {
      reject({ message: "User Not Found" });
    }
  });
}

export function signout() {
  return new Promise(async (resolve) => {
    resolve({ data: "success" });
  });
}
