module.exports = function solveSudoku(matrix) {
  // I recognized that one cell can have only one value
  // This is a search method
  // Links wich I used:
  /*  https://en.wikipedia.org/wiki/Sudoku_solving_algorithms    
      https://habr.com/ru/post/113837/
      https://ateist.spb.ru/programs/sudoku.htm
      https://codeburst.io/learn-and-understand-recursion-in-javascript-b588218e87ea
      https://learn.javascript.ru/recursion
      https://codereview.stackexchange.com/questions/124729/sudoku-solver-in-javascript
      */


  // fast recursive search
  function search(matrix){
    var posI, posJ, solve, number;

    for( posI = 0; posI < 9; posI++ ){
      for( posJ = 0; posJ < 9; posJ++ ){
        // search cell with 0
        if( matrix[posI][posJ] == 0 ){
          // search a number wich we can use
          for( number = 1; number <= 9; number++ ){
            if( doneOrNot(matrix, posI, posJ, number) ){
              matrix[posI][posJ] = number;
              // create new branch and search solve with new number
              solve = search(matrix);
              if( solve ){
                return solve;
              }
              // can not use new number and return 0
             matrix[posI][posJ] = 0;
            }
          }
          // did not find the solution
          return false;
        }
      }
    }
    // solve
    return true;
  }
  
  // This functions checks can we use new number or not
  function doneOrNot(board, posI, posJ, number){

    // first in subArray ( square 3x3 )
    var x = Math.floor((posI/3))*3;
    var y = Math.floor((posJ/3))*3;

    for( var k = 0; k < 3; k++ ){
      for( var l = 0; l < 3; l++ ){
        if( posI != i && posJ != j && board[ x + k ][ y + l ] == number ){
          return false;
        }
      }
    }

    // second in rows
    for( var j = 0; j < 9; j++ ){
      if( board[posI][j] == number && j != posJ ){
        return false;
      }
    }

    // third in cols
    for( var i = 0; i < 9; i++ ){
      if( board[i][posJ] == number && i != posI ){
        return false;
      }
    }    

    // if all checks is good, return true
    return true;
  }

  search(matrix);  

  return matrix;
}
