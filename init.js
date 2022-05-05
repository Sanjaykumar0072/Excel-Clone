let cellsContentDiv = document.querySelector(".cells-cont");

function initCells(){
    let cellsCont = "<div class = 'top-left-cell'></div>";
    cellsCont+="<div class='top-row'>"
    for(let i=0;i<26;i++){
        cellsCont+=`<div class='top-row-cell'>${String.fromCharCode(65+i)}</div>`;
    }
    cellsCont+="</div>"
    cellsCont+="<div class = 'left-col'>"
    for(let i=0;i<100;i++){
        cellsCont+=`<div class= 'left-col-cell'>${i+1}</div>`
    }
    cellsCont+="</div>"
    cellsCont+="<div class = 'cells'>"
    for(let i=0;i<100;i++){
        cellsCont+="<div class='row'>"
        for(let j=0;j<26;j++){
            cellsCont+=`<div class = 'cell' rowid='${i}' colid='${j}' contentEditable='true'></div>`;
        }
        cellsCont+="</div>"
    }
    cellsContentDiv.innerHTML = cellsCont;
}

initCells();

let sheetsDB = [];
let db;
let visitedCells;

function initDb(){
    let newSheetDB = [];
    for(let i=0;i<100;i++){
        let row = [];
        for(let j=0;j<26;j++){
            let name = String.fromCharCode(65+j)+(i+1)+"";
            let cellObject ={
                name:name,
                value:"",
                formula:"",
                children : [],
                parent : [],
                visited : false,
                fontStyle : {bold:false , italic:false , underline:false}
            }
            row.push(cellObject);
        }
        newSheetDB.push(row);
    }
    // console.log(db);
    visitedCells = [];
    db = newSheetDB;
    sheetsDB.push({db:newSheetDB,visitedCells:visitedCells});
    console.log(sheetsDB);
}

initDb();