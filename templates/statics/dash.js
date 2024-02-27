if (!window.localStorage.getItem("status")) {
  window.location.href = "/templates/bregister.html";
}

const token = window.localStorage.getItem("token")
const cards = document.getElementById("cards");
const wrapper = document.getElementsByClassName("wrapper")[0];

function fileCatch(img) {
  const file = img["files"][0];
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });
}

const createProd = async() => {
    const inputs = document.querySelectorAll(".inp");
    let fl = await fileCatch(document.getElementById("form")["file"]);
    console.log(fl)
    let data = {
      pname: inputs[0].value.toString(),
      desc: inputs[1].value.toString(),
      price: inputs[2].value.toString(),
      stock: inputs[3].value.toString(),
      img: fl,
    };
    console.log(data)
    fetch("http://127.0.0.1:4000/product/create", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "token": window.localStorage.getItem("token")
      },
      body: JSON.stringify(data),
    }).then((res) => {
      res.json().then((data) => {
        const notify = document.createElement("div");
        notify.classList.add("notifi");
        notify.innerText = data.msg;
        wrapper.appendChild(notify);
        setTimeout(() => {
          window.location.href = "/templates/dashboard.html";
          wrapper.removeChild(notify);
        }, 2000);
      });
    });
}

const cardsWrap = document.getElementById("cardsWrapper");
console.log(cardsWrap)

fetch("http://127.0.0.1:4000/product/mine", {
  method: "GET",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    token: window.localStorage.getItem("token"),
  },
}).then(res => res.json().then(data => {
  console.log(data)
  if(data?.products?.length > 0){
    data.products.map((prod) => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `<img src=${prod.img} alt="" class="pimg" />
                <p class="ptit">${prod.pname}</p>
                <p class="desc">${prod.desc}</p>
                <p class="desc">Stock: ${prod.stock}</p>
                <div class="price">${prod.price}rs / kg</div>
                <button class="btn" onclick="delItem('${prod._id}')">Remove Item</button>`;
      cardsWrap.appendChild(card)
    })
  }
}));


const delItem = (id) => {
  fetch(`http://127.0.0.1:4000/product/delPro/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      token: window.localStorage.getItem("token"),
    },
  }).then((res) =>
    res.json().then((data) => {
      if(res.status == 200){
        const notify = document.createElement("div");
        notify.classList.add("notifi");
        notify.innerText = data.msg;
        wrapper.appendChild(notify);
      }
    })
  );
}