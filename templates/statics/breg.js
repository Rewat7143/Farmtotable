const wrapper = document.getElementById("wrapper");
const token = window.localStorage.getItem("token");

const navigate = () => {
  fetch("http://127.0.0.1:4000/ismarket", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      token: token,
    },
  }).then(res => res.json().then(data => {
    if(res.status == 200){
      window.location.href = "/templates/dashboard.html"
    }
  }));
}

navigate()

const register = () => {
  const inputs = document.querySelectorAll(".inp");
  let data = {
    shopname: inputs[0].value.toString(),
    addr: inputs[1].value.toString(),
    desc: inputs[2].value.toString(),
    dp: "img:imge/img0.img",
  };
  fetch("http://127.0.0.1:4000/shop/create", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      token: token,
    },
    body: JSON.stringify(data),
  }).then((res) => {
    res.json().then((data) => {
      console.log(data);
      if(res.status == 200){
        window.localStorage.setItem("status", true);
        const notify = document.createElement("div");
        notify.classList.add("notifi");
        notify.innerText = data.msg;
        wrapper.appendChild(notify);
        setTimeout(() => {
          navigate();
          wrapper.removeChild(notify);
        }, 2000);
      }
    });
  });
};
