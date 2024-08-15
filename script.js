const score = document.createElement('div');
score.classList.add('score');
score.setAttribute('style', 'background-color: rgba(238, 228, 218, 0.35);width: 160px; ')


const game = document.getElementById('game-board');//conteiner
game.setAttribute('style',' --cell-size:128px; position: relative;height: 525px; width: 525px; background-color: #bbada0; border: 15px solid #bbada0; border-radius: 5px; display: grid; grid-template-columns: repeat(4, 113px); grid-template-rows: repeat(4, 113px); gap: 15px;');

let gameBoard;//сама матрица
let rows = 4;//ряд
let columns = 4;//колонка

gameBoard = [
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null]
];

function setGame() {//заполняем матрицу ячейками div
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            const tile = document.createElement('div');
            tile.classList.add("tile");
            tile.id = r + "-" + c;//0-1
            tile.setAttribute('style', 'background-color: rgba(238, 228, 218, 0.35); border-radius: 3px; display: flex; justify-content: center; align-items: center;');
            let num = gameBoard[r][c];//число
            updateTile(tile, num);//для цвета
            game.append(tile);
            
        
        }   
        
    }
    rerender();//   
    anyСell();//выводим число 2/4   
    anyСell();//выводим число 2/4
    

}

setGame();

function anyСell(){//любая ячейка, число 2/4

    const randomIndex = Math.floor(Math.random() * rows);//рандомное место в ряде
    const randomIndexTwo = Math.floor(Math.random() * columns); // рандомное место в колонке
    const number = Math.random() > 0.5  ? 2 : 4;//рандомное число 
    gameBoard[randomIndex][randomIndexTwo] = number;//равно рандомному числу
    //document.getElementById('[randomIndex][randomIndexTwo]');
    rerender(randomIndex, number);
    
}

function rerender(randomIndex, number){
    for(let r = 0; r < rows; r++){
        for (let c = 0; c < columns; c++) {
          
            const cell = document.getElementById(r + '-' + c);//ячейка
            // if (gameBoard[r][c] === null) {
            //     continue;
            // }

            cell.innerText = gameBoard[r][c];//если ячейка не null то добавь 2/4
            updateTile(cell, gameBoard[r][c]);
        }
    }
}   

const checkIsDirty = (board) => {
  for (let i = 0; i < 4; i++) {
  for (let j = 0; j < 4; j++) {
  if (gameBoard[i][j] !== board[i][j]) {
  return true;
  }
  }
  }
  
  return false;
  }

 document.addEventListener('keydown', (event) => {
  
    if(event.code === 'ArrowLeft'){
      const isDirty = checkIsDirty(moveLeft(gameBoard));
      
      
      gameBoard = moveLeft(gameBoard);
      if (isDirty) {
      anyСell();
      }
        
        
    }
    if (event.code === 'ArrowRight') {
      const isDirty = checkIsDirty(mvRight(gameBoard));

      gameBoard = mvRight(gameBoard);
      if (isDirty) {
      anyСell();
      }
       }

       if(event.code === 'ArrowUp'){
        const isDirty = checkIsDirty(mvTop(gameBoard));
        
        
        gameBoard = mvTop(gameBoard);
        if (isDirty) {
        anyСell();
        }
          
          
      }
      if (event.code === 'ArrowDown') {
        const isDirty = checkIsDirty(moveDown(gameBoard));
  
        gameBoard = moveDown(gameBoard);
        if (isDirty) {
        anyСell();
        }
         }
    
    rerender();
})

const moveLeft = (arr) => {
  const asd = [];
  for (let c = 0; c < arr.length; c++) {
  
  const result = arr[c].filter(item => item !== null);
  for (let i = 0; i < result.length; i++) {
  if (result[i]  && result[i] === result[i + 1]) {
  result[i] *= 2;
  result[i + 1] = null;
  }
  }
  const sum = result.filter(item => item !== null);
  
  while (sum.length < 4) {
  sum.push(null);
  }
  console.log(sum ,123456);
  
  asd.push(sum);
  }
  return asd;
  } 

  const mvRight = (arr) => {//направо
    const copy = arr.map(r => r.reverse())//
    const res = moveLeft(copy);
    console.log(res);
    
    return res.map(r => r.reverse());
    }

// const mvRight = (arr) => {//направо
//   const copy = [...arr].reverse();//
//   const res = moveLeft(copy);
//   return res.reverse();
// }

const rotate = (arr, callback) => {
  const allResults = [];
  for (let c = 0; c < arr.length; c++) {//прошлись по столбцам
    const newArr = [];
    for (let r = 0; r < arr.length; r++) {//прошлись по рядам
      newArr.push(arr[r][c]);//добавили в переменную arr результат прохождения с начала ряда сверху вних по колонке 
    }

    allResults.push(newArr);
  }
  return callback(allResults);
}

const createEmptyMatrix = (size) => {
  return new Array(size).fill(undefined).map(() => {
    return new Array(size).fill(null)
  })
}

const rotateBack = (allResults) => {
  const newResults = createEmptyMatrix(gameBoard.length)

  for (let c = 0; c < allResults.length; c++) {//прошлись по столбцам
    for (let r = 0; r < allResults.length; r++) {
      newResults[r][c] = allResults[c][r];
    }
  }

  return newResults;
}

const mvTop = (arr) => {
  const allResults = rotate(arr, moveLeft);
  return rotateBack(allResults);
}

const moveDown = (arr) => {
  const allResults = rotate(arr, mvRight);
  return rotateBack(allResults);
}


function updateTile(tile, num){

    switch (num) {
        case 2:
            tile.setAttribute('style', 'background-color: none;' )
            tile.classList.add("x2");
            tile.innerText = num;
            break;
        case 4:
            tile.setAttribute('style', 'background-color: none;' )
            tile.classList.add("x4");
            tile.innerText = num;
            break;
        case 8:
            tile.setAttribute('style', 'background-color: none;' )
            tile.classList.add("x8");
            tile.innerText = num;
            break;
        case 16:
            tile.setAttribute('style', 'background-color: none;' )
            tile.classList.add("x16");
            tile.innerText = num;
            break;
        case 32:
            tile.setAttribute('style', 'background-color: none;' )
            tile.classList.add("x32");
            tile.innerText = num;
            break;
        case 64:
            tile.setAttribute('style', 'background-color: none;' )
            tile.classList.add("x64");
            tile.innerText = num;
            break;
        case 128:
            tile.setAttribute('style', 'background-color: none;' )
            tile.classList.add("x128");
            tile.innerText = num;
            break;
        case 256:
            tile.setAttribute('style', 'background-color: none;' )
            tile.classList.add("x256");
            tile.innerText = num;
            break;
        case 512:
            tile.setAttribute('style', 'background-color: none;' )
            tile.classList.add("x512");
            tile.innerText = num;
             break;
        case 1024:
            tile.setAttribute('style', 'background-color: none;' )
            tile.classList.add("x1024");
            tile.innerText = num;
            break;
        case 2048:
            tile.setAttribute('style', 'background-color: none;' )
            tile.classList.add("x2048");
            tile.innerText = num;
            break;
            default:
             tile.setAttribute('style', 'background-color: rgba(238, 228, 218, 0.35)' )
             tile.innerText = '';
             break;
    }
 }



