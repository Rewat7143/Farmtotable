const wrapper = document.getElementById("wrapper");
const token = window.localStorage.getItem("token");
if (token != null) {
  window.location.href = "/templates/index.html";
}


const register = () => {
    const inputs = document.querySelectorAll(".inp");
    let data = {
      username: inputs[0].value.toString(),
      email: inputs[1].value.toString(),
      password: inputs[2].value.toString(),
    };
    fetch("http://127.0.0.1:4000/auth/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      res.json().then((data) => {
        const notify = document.createElement("div");
        notify.classList.add("notifi");
        notify.innerText = data.msg;
        wrapper.appendChild(notify);
        if(res.status == 200){
          window.localStorage.setItem("token", data.token);
          setTimeout(() => {
            window.location.href = "/templates/index.html"
            wrapper.removeChild(notify);
          }, 2000);
      }
      })
    });
}


const login = () => {
  const inputs = document.querySelectorAll(".inp");
  let data = {
    email: inputs[0].value.toString(),
    password: inputs[1].value.toString(),
  };
  fetch("http://127.0.0.1:4000/auth/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => {
    res.json().then((data) => {
      const notify = document.createElement("div");
      notify.classList.add("notifi");
      notify.innerText = data.msg;
      wrapper.appendChild(notify);
      if(res.status == 200){
        window.localStorage.setItem("token", data.token);
        window.localStorage.setItem("status", data.status);
        setTimeout(() => {
          wrapper.removeChild(notify);
          window.location.href = "/templates/index.html";
        }, 2000);
      }
    });
  });
};