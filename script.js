let hideShow = () => {
  if (count.classList.contains("hide")) {
    count.classList.remove("hide");
  } else if (!count.classList.contains("show")) {
    count.classList.add("show");
  }
};
let addToCart = (btnE) => {
  let parent = btnE.parentNode;
  let carr = parent.children;

  let img = carr[0].src;
  let name = carr[1].innerHTML;
  let price = carr[2].innerHTML;
  price = price.replace("Price : ", "");
  price = price.replace("kyat", "");
  let item = {
    image: img,
    iname: name,
    iprice: price,
  };
  if (sessionStorage.getItem("item") == null) {
    let arr = [item];
    let str = JSON.stringify(arr);
    sessionStorage.setItem("item", str);
    hideShow();
    count.innerHTML = 1;
  } else {
    let str = sessionStorage.getItem("item");
    let arr = JSON.parse(str);
    arr[arr.length] = item;
    hideShow();
    count.innerHTML = arr.length;
    str = JSON.stringify(arr);
    sessionStorage.setItem("item", str);
  }
};
let showItems = () => {
  if (sessionStorage.getItem("item") != null) {
    let jstr = sessionStorage.getItem("item");
    let arr = JSON.parse(jstr);
    let str = "<table>";
    str += "<tr>";
    str += "<th>No</th>";
    str += "<th>Image</th>";
    str += "<th>Name</th>";
    str += "<th>Price</th>";
    str += "<th>Quantity</th>";
    str += "<th>Total</th>";
    str += "<th></th>";
    str += "</tr>";

    let no = 1;
    let total = 0;
    for (let i = 0; i < arr.length; i++) {
      str += "<tr>";
      str += "<td>" + no + "</td>";
      no++;
      str += "<td><img src='" + arr[i].image + "' class='itemimg'></td>";
      str += "<td>" + arr[i].iname + "</td>";
      str += "<td>" + arr[i].iprice + "</td>";
      str +=
        "<td><input type='number' value='1' min='1' onchange='cal(this);' class='tin'></td>";
      str += "<td>" + arr[i].iprice + "</td>";
      str +=
        "<td onclick='del(this);'><button class='delete'><i class='fa-solid fa-trash'></i></button></td>";
      str += "</tr>";
      total += parseInt(arr[i].iprice);
    }
    str +=
      "<tr><td colspan = '5'>Balance</td><td id='balance'>" +
      total +
      "</td><td><button onclick='res(this);'>Buy</ button></td></tr>";
    str += "</table>";
    ans.innerHTML = str;
  } else {
    ans.innerHTML =
      "<div class='blank'><div><i class='fa-solid fa-basket-shopping'></i><div><p>Nothing is here :)<p></div>";
  }
};
let res = (e) => {
  ans.innerHTML =
    "<p style='font-weight:bold;font-size:60px;text-align:center;'>Your orders are successful.Thank for ordering!</p>";
};
let cal = (quantity) => {
  let qty = parseInt(quantity.value);
  let tr = quantity.parentNode.parentNode;
  let carr = tr.children;
  let price = parseInt(carr[3].innerHTML);
  let oldTotal = parseInt(carr[5].innerHTML);
  let total = price * qty;
  carr[5].innerHTML = total;

  let b = parseInt(balance.innerHTML);
  b -= oldTotal;
  b += total;
  balance.innerHTML = b;
};
let del = (deltd) => {
  let tre = deltd.parentNode;
  let name = tre.children[2].innerHTML;
  let jstr = sessionStorage.getItem("item");
  let arr = JSON.parse(jstr);
  let arr2 = new Array();
  let j = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].iname != name) {
      arr2[j++] = arr[i];
    }
  }
  jstr = JSON.stringify(arr2);
  sessionStorage.setItem("item", jstr);
  ans.innerHTML = "";
  showItems();
};
