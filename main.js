init();

let xOffset = document.getElementById('frame').getBoundingClientRect().left + window.scrollX;
let yOffset = document.getElementById('frame').getBoundingClientRect().top + window.scrollY;
let strokeColor = "black";

function changeFillColor(id){
    document.getElementById('canvas').style.backgroundColor = document.getElementById(id).style.color;
}

function changeStrokeColor(id){
    strokeColor = document.getElementById(id).style.color;
}

function calculateOffset(){
    xOffset = document.getElementById('frame').getBoundingClientRect().left + window.scrollX;
    yOffset = document.getElementById('frame').getBoundingClientRect().top + window.scrollY;
}

function init(){
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    
    canvas.height = document.getElementById('frame').getBoundingClientRect().height;
    canvas.width = document.getElementById('frame').getBoundingClientRect().width;
    
    let painting = false;

    function startPainting(e){
        painting = true;
        draw(e);
    }
    
    function stopPainting(){
        painting = false;
        context.beginPath();
    }

    function draw(e){
        if(!painting) return;
        context.lineWidth = 5;
        context.lineCap = "round";

        context.strokeStyle = strokeColor;
        context.lineTo(e.clientX-xOffset, e.clientY-yOffset);
        context.stroke();
        context.beginPath();
        context.moveTo(e.clientX-xOffset, e.clientY-yOffset)
    };

    function erase(){
        context.beginPath();
        context.clearRect(0,0,canvas.width,canvas.height);
        context.stroke();
    }

    canvas.addEventListener('mousedown', startPainting);
    canvas.addEventListener('mouseup', stopPainting);
    canvas.addEventListener('mousemove', draw);
    window.addEventListener('resize', calculateOffset);
    document.getElementById('erase').addEventListener('click', erase);
}