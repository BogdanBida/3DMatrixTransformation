matrix = [
    [1,0,0,0],
    [0,1,0,0],
    [0,0,1,0],
    [0,0,0,1]
]

var movemode = false;
var mouseX0, mouseY0;

document.body.onmousedown = function (e) {
    mouseX0 = e.clientX;
    mouseY0 = e.clientY;
    movemode = true;
}
document.body.onmouseup = function (e) {
    movemode = false;
    mouseX0 = mouseY0 = null;
    dx = 0;
    dy = 0;
}

document.body.onmousemove = function (e) {
    if ((e.which != 1) || !movemode) return;
    dx = -(mouseY0 - e.clientY) / 10000
    dy = -(mouseX0 - e.clientX) / 10000;
}

document.body.onwheel = function (e) {
    camera.position.z += e.deltaY / 10; 
}

function initMatrix() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            let elem = document.getElementById('matrix_td_' + i + '_' + j)
            elem.value = matrix[i][j];
        }
    }
}
initMatrix();

function show() {
    let A = []
    for (let i = 0; i < 4; i++) {
        A.push([])
        for (let j = 0; j < 4; j++) {
            let value = Number(document.getElementById('matrix_td_'+i+'_'+j).value);
            A[i][j] = value;
        }
    }

    let B = [];
    for (let i = 0; i < 8; i++) {
        let t = meshCoordinates[i];
        B[i] = [t.x, t.y, t.z, 1];
    }
    
    let C = multMatrix(B, A);
    let Res = [];
    for (let i = 0; i < 8; i++) {
        let t = C[i];
        Res[i] = new THREE.Vector3(t[0], t[1], t[2]);
    }

    rebuildMesh(Res);
}

function print(A) {
    let str = ""
    for (let i = 0; i < A.length; i++) {
        for (let j = 0; j < A[0].length; j++) {
            str += A[i][j] + " ";
        }
        str += "\n";
    }
    alert(str);
}


document.getElementById('btn-show').onclick = show;

function multMatrix(A,B) {
    var rowsA = A.length, colsA = A[0].length, rowsB = B.length, colsB = B[0].length, C = [];
    if (colsA != rowsB) return false;
    for (var i = 0; i < rowsA; i++) C[i] = [];
    for (var k = 0; k < colsB; k++)
     { for (var i = 0; i < rowsA; i++)
        { var temp = 0;
          for (var j = 0; j < rowsB; j++) temp += A[i][j]*B[j][k];
          C[i][k] = temp;
        }
     }
    return C;
}