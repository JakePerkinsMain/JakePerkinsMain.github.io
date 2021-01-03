function load() {
  var rellax = new Rellax('.rellax');
  document.querySelectorAll('.geostack').forEach((elem) => {
    generateGeoStack({
      parent: elem,
      color: ["var(--redL)", "var(--blueL)"],
      size: 8,
      thickness: .75,
      columns: 2,
      rows: 6
    });

  })
  if (!getCookie("theme")) {
    console.log("no theme set")
    setCookie("theme", "Light")
  }
  loadTheme()
  console.log(t)
  var elem = document.querySelector('.main-carousel');
  var flkty = new Flickity(elem, {
    cellAlign: 'left',
    contain: true
  });
  mT();
  VanillaTilt.init(document.querySelectorAll(".tilt"), {
    reverse: true,
    max: 7,
    speed: 400,
    scale:1.025,
  })
}
let t; //theme
function loadTheme() {
  t = getCookie("theme");
  let style = document.documentElement.style;
  if (t == "Light") {
    q.get("#theme-btn-img").src = "assets/cloud-moon-solid.svg"
    style.setProperty('--red', '#ff1f86');
    style.setProperty('--blue', '#2550ff');
    style.setProperty('--redL', '#FF80B3');
    style.setProperty('--blueL', '#92A8FF');
    style.setProperty('--bg', 'white');
    style.setProperty('--text', '#181e2f');
    style.setProperty('--transparent', '#00000000');
    style.setProperty('--accent', " #b7b8ca")
    style.setProperty('--mode', "92%")
  } else if (t == "Dark") {
    q.get("#theme-btn-img").src = "assets/cloud-sun-solid.svg"
    style.setProperty('--red', '#ff61ab');
    style.setProperty('--blue', '#6b89ff');
    style.setProperty('--redL', '#ff94c6');
    style.setProperty('--blueL', '#7a95ff');
    style.setProperty('--bg', '#181e2f');
    style.setProperty('--text', 'white');
    style.setProperty('--accent', "#323c57")
    style.setProperty('--mode', "1000%")
    style.setProperty('--transparent', '#00000000');
  }
  console.log(t)
}
function switchTheme() {
  if (t == "Light") {
    setCookie("theme", "Dark");
  } else if (t == "Dark") {
    setCookie("theme", "Light");
  }
  loadTheme()
}

function setCookie(cname, cvalue) {
  document.cookie = cname + "=" + cvalue + ";" + "expires=Sat, 31 Dec 2050 12:00:00 UTC";
}

function getCookie(cname) {             //reads cookie
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return false;
}
function mT(h) {
  if (h) {
    window.location.href = h;
    q.get(h + "-s").scrollIntoView({ behavior: 'smooth', block: 'center' })
  } else {
    if (!window.location.hash) return false
    q.get(window.location.hash + "-s").scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
}
var autoExpand = function (field) {

  // Reset field height
  field.style.height = 'inherit';

  // Get the computed styles for the element
  var computed = window.getComputedStyle(field);

  // Calculate the height
  var height = parseInt(computed.getPropertyValue('border-top-width'), 10)
    + parseInt(computed.getPropertyValue('padding-top'), 10)
    + field.scrollHeight
    + parseInt(computed.getPropertyValue('padding-bottom'), 10)
    + parseInt(computed.getPropertyValue('border-bottom-width'), 10);

  field.style.height = height - 34 + 'px';

};

document.addEventListener('input', function (event) {
  if (event.target.tagName.toLowerCase() !== 'textarea') return;
  autoExpand(event.target);
}, false);