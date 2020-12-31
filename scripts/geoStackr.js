// based on this Dribbble shot https://dribbble.com/shots/4806195-SXSW-Featured-Events-Exploration

// globals
let ssize = 50;
let ssw = 3;
let csolumns = 3;
let rsows = 5;
let w;
let h;
let r;
let geos = ["circle", "line"];
let cMax = 5; // max circles to allow on each SVG

let circles = 0; // circles generated in currentSVG
let svg;
let svgNS;

// regex
const shapesRegEx = /<(?:\/)?rect>?|<(?:\/)?line>?|<(?:\/)?circle>?/g;
const groupsRegEx = /<(?:\/)?g>/g;

// creates each "box" in the SVG
const createGroup = (...args) => {
	const [x1, x2, y1, y2, col, opt] = args;
	const g = document.createElementNS(svgNS, "g");
	let rect = createBox(x1, x2, y1, y2, col, opt);
	let shape; // shape inside of box
	const random = Math.floor(Math.random() * 2);

	if (geos[random] === "circle" && circles < cMax && col % 2 === 0) {
		circles++;
		shape = createCircle(x1, y1, opt);
	} else {
		shape = createLine(x1, x2, y1, y2, col, opt);
	}

	svg.appendChild(g);
	g.appendChild(rect);
	g.appendChild(shape);
};

const createBox = (...args) => {
	const [x1, x2, y1, y2, col, opt] = args;
	const rect = document.createElementNS(svgNS, "rect");
	rect.setAttribute("x", x1);
	rect.setAttribute("y", y1);
	rect.setAttribute("width", opt.size || 5);
	rect.setAttribute("height", opt.size || 5);
	rect.setAttribute("fill", "none");
	rect.setAttribute("stroke-width", opt.thickness || .5);
	rect.setAttribute("stroke", opt.color || "#ff00ff");

	return rect;
};

const createLine = (...args) => {
	const [x1, x2, y1, y2, col, opt] = args;
	const line = document.createElementNS(svgNS, "line");
	line.setAttribute("x1", x1);
	line.setAttribute("y1", y1);
	line.setAttribute("x2", (opt.size || 5) + x1);
	line.setAttribute("y2", (opt.size || 5) + y1);
	line.setAttribute("stroke", opt.color || "#ff00ff");
	line.setAttribute("stroke-width", opt.thickness || .5);

	if (col % 2 === 0) {
		line.setAttribute("transform", `translate(${x1 + x2}, 0)scale(-1,1)`);
	}

	return line;
};

const createCircle = (x, y, opt) => {
	const cx = r + x;
	const cy = r + y;

	const circle = document.createElementNS(svgNS, "circle");
	circle.setAttribute("cx", cx);
	circle.setAttribute("cy", cy);
	circle.setAttribute("r", r);
	circle.setAttribute("stroke", opt.color || "#ff00ff");
	circle.setAttribute("stroke-width", opt.thickness || .5);
	circle.setAttribute("fill", "none");

	return circle;
};

// reset each time a new SVG is generated
const resetGlobals = () => {
	svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	svgNS = svg.namespaceURI;
	circles = 0;
};

// create a new SVG
const generateSVG = (opt) => {
	resetGlobals();
	const vals = Array.from({ length: (opt.rows || 4) * (opt.columns || 2) }, (item) =>
		Math.round(Math.random())
	);

	let row = 0;

	vals.forEach((val, i) => {
		const coords = [];
		const xOffset = i % (opt.columns || 2);

		if ((i + 1) % (opt.columns || 2) === 0) {
			row++;
		}

		if (i % (opt.columns || 2) === 2) {
			coords.push(
				xOffset * (opt.size || 5),
				(opt.size || 5) * (xOffset + 1),
				(opt.size || 5) * (row - 1),
				(opt.size || 5) * (row + 1)
			);
		} else {
			coords.push(
				xOffset * (opt.size || 5),
				(opt.size || 5) * (xOffset + 1),
				(opt.size || 5) * row,
				(opt.size || 5) * (row + 1)
			);
		}

		if (val) {
			createGroup(...coords, i, opt);
		}
	});

	svg.setAttribute("viewBox", `-1.5 -1.5 ${w + 10} ${h + 10}`);
	svg.setAttribute("width", w + 10);
	svg.setAttribute("height", h + 10);
	svg.setAttribute("id", `geoboxes`);

	return svg;
};

// on load/click of New BTN
const generateGeoStack = (opt) => {
	if (!isNode(opt.parent) && opt.parent) {
		if (Array.isArray(opt.color)){
			opt.color = opt.color[Math.floor(Math.random() * opt.color.length)]
		}
		w = (opt.columns || 2) * (opt.size || 5);
		h = (opt.rows || 4) *( opt.size || 5);
		r = (opt.size || 5) / 2;
		console.log(isNode(document.querySelector(opt.parent)))
		const svg = generateSVG(opt);
		displaySVG(svg, document.querySelector(opt.parent));
	} else if (isNode(opt.parent) && opt.parent) {
		if (Array.isArray(opt.color)){
			opt.color = opt.color[Math.floor(Math.random() * opt.color.length)]
		}
		w = (opt.columns || 2) * (opt.size || 5);
		h = (opt.rows || 4) *( opt.size || 5);
		r = (opt.size || 5) / 2;
		console.log(isNode((opt.parent)))
		const svg = generateSVG(opt);
		displaySVG(svg, opt.parent);
	} else {
		console.error("GeoStack Err: Parent Element not defined");
	}
};

const displaySVG = (svg, e) => {
	e.innerHTML = "";
	e.appendChild(svg);
};

function isNode(o){
  return (
    typeof Node === "object" ? o instanceof Node : 
    o && typeof o === "object" && typeof o.nodeType === "number" && typeof o.nodeName==="string"
  );
}
