const cards = document.getElementById("cards");
const wrapper = document.getElementsByClassName("mwrapper")[0]
fetch("http://localhost:4000/product/all", {
  method: "GET",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
}).then((res) => {
  res
    .json()
    .then((data) => {
      data.products.map((p) => {
        let card = document.createElement("div");
        card.classList.add("card");
        card.setAttribute("shop", p.uid)
        console.log(p.uid)
        let prod = `<img src=${p.img} alt="" class="pimg" />
          <p class="ptit">${p.pname}</p>
          <p class="desc">${p.desc}</p>
          <p class="desc">Stock: ${p.stock}</p>
          <div class="price">${p.price}rs / kg</div>
          <button class="btn" onclick="submitOrder('${p._id}')">Place Order</button>`;
        card.innerHTML = prod;
        cards.appendChild(card);
      });
    })
    .catch((e) => console.log(e));
});

const token = window.localStorage.getItem("token");
fetch("http://localhost:4000/shop", {
  method: "GET",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    token: token,
  },
}).then((res) => {
  res.json().then((data) => {
    data.shops.map((p) => {
      let card = document.createElement("div");
      card.classList.add("card");
      let prod = `<a href="#">
          <div class="ket">
            <img src="./statics/imgs/Rectangle 24.png" alt="" class="dp">
            <div class="ratings">
            ${p.shopname}
            </div>
          </div>
        </a>`;
      card.innerHTML = prod;
      wrapper.appendChild(card);
    });
  });
});

const submitOrder = (id) => {
    fetch(`http://localhost:4000/orders/create/${id}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        token: window.localStorage.getItem("token"),
      },
    }).then((res) => {
      res.json().then((data) => {
        console.log(data);
      });
    });
}
