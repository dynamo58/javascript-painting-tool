init();


function getOffset() {
    const rect = document.getElementById('frame').getBoundingClientRect();
    return {
      left: rect.left + window.scrollX,
      top: rect.top + window.scrollY
    };
}

const xOffset = getOffset().left;
const yOffset = getOffset().top;

function init(){
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    
    canvas.height = 0.8*window.innerHeight;
    canvas.width = 0.8*window.innerWidth;
    
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

        context.lineTo(e.clientX-xOffset, e.clientY-yOffset);
        context.stroke();
        context.beginPath();
        context.moveTo(e.clientX-xOffset, e.clientY-yOffset)
    };

    canvas.addEventListener('mousedown', startPainting);
    canvas.addEventListener('mouseup', stopPainting);
    canvas.addEventListener('mousemove', draw);

}

