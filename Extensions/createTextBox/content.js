function createTextBox(domContent) {
  //let elem = document.body;
  //var e = window.event;

  // var posX = e.clientX;
  // var posY = e.clientY;
  //console.log(posX + ' - '+ posY);
  let elem = document.body;
  let textBox = document.createElement('input');
  textBox.classList.add('myTextBox');
  elem.insertBefore(textBox,elem.firstChild);
  textBox.focus();
}

function addStyle(css) {
  var head, style;
  head = document.getElementsByTagName("head")[0];
  if (!head) {
    return;
  }
  style = document.createElement("style");
  style.type = "text/css";
  style.innerHTML = css;
  head.appendChild(style);
}
function myClickHandler(e){
  console.dir(e);
}
addStyle('.myTextBox' + ' {visibility: visible; position: absolute; z-index:10; background-color: azure;}');
createTextBox();
console.dir(this);
document.addEventListener('click',myClickHandler);
