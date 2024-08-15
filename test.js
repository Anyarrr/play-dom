
const moveLeft = (arr) => {
    const result = arr.filter(item => item !== null);
    for (let i = 0; i < result.length; i++) {
      if (result[i] === result[i + 1]) {
        result[i] *= 2;
        result[i + 1] = null;
      }
    }
  
    const sum = result.filter(item => item !== null);
  
    while (sum.length < 4) {
      sum.push(null);
    }
  
    return sum;
  }
  
  const mvRight = (arr) => {//направо
    const copy = [...arr].reverse();//
    const res = moveLeft(copy);
    return res.reverse();
  }
  
  const rotate = (arr, callback) => {
    const allResults = [];
    for (let c = 0; c < arr.length; c++) {//прошлись по столбцам
      const newArr = [];
      for (let r = 0; r < arr.length; r++) {//прошлись по рядам
        newArr.push(arr[r][c]);//добавили в переменную arr результат прохождения с начала ряда сверху вних по колонке 
      }
      const res = callback(newArr);//сложил и revers
      allResults.push(res);
    }
    return allResults;
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
  