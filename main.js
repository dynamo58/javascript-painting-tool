const post = document.getElementById("canvas");
let xOffset =
	document.getElementById("frame").getBoundingClientRect().left +
	window.scrollX;
let yOffset =
	document.getElementById("frame").getBoundingClientRect().top + window.scrollY;
let strokeColor = "white";
let strokeWidth = 5;

function changeFillColor(id) {
	document.getElementById(
		"canvas"
	).style.backgroundColor = document.getElementById(id).style.color;
}

function changeStrokeColor(id) {
	strokeColor = document.getElementById(id).style.color;
}

function changeStrokeWidth(size) {
	strokeWidth = size;
	console.log(strokeWidth);
}

init();

function init() {
	const canvas = document.getElementById("canvas");
	const context = canvas.getContext("2d");

	canvas.height = document
		.getElementById("frame")
		.getBoundingClientRect().height;
	canvas.width = document.getElementById("frame").getBoundingClientRect().width;

	let painting = false;

	function startPainting(e) {
		painting = true;
		draw(e);
	}

	function stopPainting() {
		painting = false;
		context.beginPath();
	}

	function draw(e) {
		if (!painting) return;
		context.lineWidth = strokeWidth;
		context.lineCap = "round";

		context.strokeStyle = strokeColor;
		context.lineTo(
			e.clientX -
				document.getElementById("frame").getBoundingClientRect().left +
				window.scrollX,
			e.clientY - document.getElementById("frame").getBoundingClientRect().top
		);
		context.stroke();
		context.beginPath();
		context.moveTo(
			e.clientX -
				document.getElementById("frame").getBoundingClientRect().left +
				window.scrollX,
			e.clientY - document.getElementById("frame").getBoundingClientRect().top
		);
	}

	function erase() {
		context.beginPath();
		context.clearRect(0, 0, canvas.width, canvas.height);
		context.stroke();
	}

	function saveCanvas() {
		canvas.toBlob((blob) => {
			const a = document.createElement("a");
			document.body.append(a);
			a.download = `export.png`;
			a.href = URL.createObjectURL(blob);
			a.click();
			a.remove();
		});
	}

	canvas.addEventListener("mousedown", startPainting);
	canvas.addEventListener("mouseup", stopPainting);
	canvas.addEventListener("mousemove", draw, true);
	document.getElementById("screen").addEventListener("click", saveCanvas);
}

/*


document.getElementById("image").onclick = function() {
	var c = document.getElementById("canvas");
	var ctx = c.getContext("2d");
	var img = document.getElementById("picture.png");
	ctx.drawImage(img, 10, 10);
  }; 


function calculateOffset() {
	xOffset =
		document.getElementById("frame").getBoundingClientRect().left +
		window.scrollX;
	yOffset =
		document.getElementById("frame").getBoundingClientRect().top +
		window.scrollY;
}

*/
