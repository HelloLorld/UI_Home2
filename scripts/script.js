function solve() {
  var coefA = document.getElementById("coefA");
  if (coefA.value == 0) {
    alert(
      "Коэффициент при первом слагаемом уравнения не может быть равным нулю измените его и попробуйте снова."
    );
    return;
  }

  var coefB = document.getElementById("coefB");
  var coefC = document.getElementById("coefC");
  var answer = document.getElementById("answer");
  var text;
  var res = new Array();

  var discr = findDicr();
  if (discr < 0) {
    text = "Решений нет";
  } else if (discr == 0) {
    res[0] = findX(true, discr);
    if (Number.isInteger(res[0])) text = "[" + res[0] + "]";
    else text = "[" + res[0].toFixed(3) + "]";
  } else {
    res[0] = findX(true, discr);
    res[1] = findX(false, discr);
    if (Number.isInteger(res[0]) && Number.isInteger(res[1]))
      text = "[" + res[0] + ";" + res[1] + "]";
    else text = "[" + res[0].toFixed(3) + ";" + res[1].toFixed(3) + "]";
  }
  answer.textContent = text;
  var data = [coefA.value, coefB.value, coefC.value, text];
  createTable(data);
}

function findX(sign, discr) {
  var x;
  if (sign) x = (-coefB.value + Math.pow(discr, 0.5)) / (2 * coefA.value);
  else x = (-coefB.value - Math.pow(discr, 0.5)) / (2 * coefA.value);
  return x;
}
function findDicr() {
  var discr = Math.pow(coefB.value, 2) - 4 * coefA.value * coefC.value;
  return discr;
}

function createTable(data) {
  var table = document.getElementById("history");
  var tr = document.createElement("tr");
  var td;
  for (var i = 0; i < data.length; i++) {
    td = document.createElement("td");
    var textNode = document.createTextNode(data[i]);
    td.appendChild(textNode);
    tr.appendChild(td);
  }
  td = document.createElement("td");
  var button = document.createElement("button");
  button.textContent = "Удалить";
  button.className = "delButton";
  button.addEventListener("click", deleteRow);
  td.appendChild(button);
  tr.appendChild(td);
  table.appendChild(tr);
  zebroMode();
}

function deleteRow() {
  var rem = this.parentNode;
  var table = document.getElementById("history");
  table.removeChild(rem.parentNode);
  zebroMode();
}

function zebroMode() {
  var table = document.getElementById("history");
  var trs = table.getElementsByTagName("tr");
  for (var i = 1; i < trs.length; i++) {
    if (i % 2 == 0) trs[i].className = "otherRow";
    else trs[i].className = "whiteRow";
  }
}
