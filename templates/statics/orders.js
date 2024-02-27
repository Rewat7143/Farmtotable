const bd = document.getElementById("bd");
const token = window.localStorage.getItem("token");
fetch(`http://localhost:4000/orders/all`, {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    token: window.localStorage.getItem("token"),
  },
}).then((res) => {
  res.json().then((data) => {
    console.log(data)
    if(data.msg){
      console.log("none")
    }
    else{
      data.orders.map((order) => {
        const row = document.createElement("tr");
        row.classList.add("row");
        const newRec = `
            <td class="td" id="pname">${order._id}</td>
            <td class="td" id="pname">${order.orderDate}</td>
            <td class="td" id="pname">${order.prodname}</td>
            <td class="td" id="pname">${order.price}</td>
            <td class="td" id="pname">${order.orderStatus}</td>
            <td class="td" id="pname">${order.quantity}</td>
        `;
        row.innerHTML = newRec;
        bd.appendChild(row);
      });
    }
  });
});
