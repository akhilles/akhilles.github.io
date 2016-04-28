var N = 7;  // number of data points
var M = 4;  // number of independent variables
var X, Y;
var sigDigits = 5;
var regrCoeff = [];

go();

function go() {
  buildxy();
  linregr();
}

function buildxy() {
  X = [
    [0,0,0,0,0,0,0,0],
    [0,5,1,9,6,5,5,5],
    [0,1,2,6,4,1,4,1],
    [0,5,4,5,7,4,9,4],
    [0,7,2,4,8,1,7,4]
  ];
  Y = [0,56,45,23,66,46,22,21];
}

function linregr() {
  var sum;
  B = new makeArray1D(M + 2);
  P = new makeArray2D(M + 2, M + 2);
  inverseP = new makeArray2D(M + 2, M + 2);

  for (var i = 1; i <= N; i++)  X[0][i] = 1;
  for (var i = 1; i <= M + 1; i++) {
    sum = 0;
    for (var j = 1; j <= N; j++) sum += X[i - 1][j] * Y[j];
    B[i] = sum;
    for (var j = 1; j <= M + 1; j++) {
      sum = 0;
      for (var k = 1; k <= N; k++) sum += X[i - 1][k] * X[j - 1][k];
      P[i][j] = sum;
    }
  }

  inverseP = inverse(P);
  for (i = 0; i <= M; i++) {
    sum = 0;
    for (j = 1; j <= M + 1; j++) sum += inverseP[i + 1][j] * B[j];
    regrCoeff[i] = sum;
  }
}

function inverse(A) {
  var length = M + 1;
  var inverseA = new makeArray2D(M + 2, M + 2);
  var detA = det(A);
  for (var i = 1; i <= M + 1; i++){
    for (var j = 1; j <= M + 1; j++){
      minor = new makeArray2D(M + 1, M + 1);
      var column, row;
      for (var m = 1; m <= M; m++){
        if (m < j) column = m;
        else column = m + 1;
        for (var n = 1; n <= M; n++){
          if (n < i) row = n;
          else row = n + 1;
          minor[n][m] = A[row][column];
        }
      }
      if ((i + j) % 2 == 0) factor = 1;
      else factor = -1;
      inverseA[j][i] = det(minor) * factor / detA;
    }
  }
  return inverseA;
}

function det(A) {
  var length = A.length - 1;
  if (length == 1) return A[1][1];

  var sum = 0;
  var factor = 1;
  for (var i = 1; i <= length; i++) {
    if (A[1][i] != 0){
      minor = new makeArray2D(length, length);
      var column;
      for (var m = 1; m <= length - 1; m++){
        if (m < i) column = m;
        else column = m + 1;
        for (var n = 1; n <= length - 1; n++) minor[n][m] = A[n + 1][column];
      }
      sum += A[1][i] * factor * det(minor);
    }
    factor = -factor;
  }
  return sum;
}

function makeArray1D(X) {
  this.length = X;
  for (var i = 0; i < X; i++) this[i] = 0;
}

function makeArray2D(X, Y) {
  this.length = X;
  for (var i = 0; i < X; i++) this[i] = new makeArray1D(Y);
}

console.log(X);
console.log(Y);
console.log(regrCoeff);
alert(regrCoeff);
