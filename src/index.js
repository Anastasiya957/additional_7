function Solver() {
  this.working_grid = [];
};

Solver.prototype.validate_row = function (r, c) {
    let value = this.working_grid[r][c];
    for (let _c = 0; _c < 9; _c++) {
        if (_c != c && this.working_grid[r][_c] == value) {
            return false;
        }
    }
    return true;
};

Solver.prototype.validate_column = function (r, c) {
  let value = this.working_grid[r][c];
  for (let _r = 0; _r < 9; _r++) {
  	if (_r != r && this.working_grid[_r][c] == value) {
  	  return false;
  	}
  }
  return true;
};

Solver.prototype.validate_box = function (r, c) {
  let value = this.working_grid[r][c];
  let box_r = Math.floor(r / 3);
  let box_c = Math.floor(c / 3);

  for (let _r = box_r * 3; _r < box_r * 3 + 3; _r++) {
  	for (let _c = box_c * 3; _c < box_c * 3 + 3; _c++) {
  	  if (_r != r && _c != c && this.working_grid[_r][_c] == value) {
  	  	return false;
  	  }
  	}
  }
  return true;
};

Solver.prototype.backtrack = function (r, c) {
  c++; // Move to next cell in row
  if (c > 8) { // Moves to next row when end of column is reached
  	c = 0;
  	r++;
  	if (r > 8) { // Checks if end of grid is reached
  	  return true;
  	}
  }

  if (this.working_grid[r][c] != 0) { // Move to next cell if there is a number in current cell
  	if (!(this.validate_row(r, c) && this.validate_column(r, c) && this.validate_box(r, c))){
  	  return false;
  	}
  	return this.backtrack(r, c);
  	} else { // Goes through all possible numbers if cell is blank
  	  for (let x = 1; x < 10; x++) {
  	  	this.working_grid[r][c] = x;
  	  	if (this.validate_row(r, c) &&  this.validate_column(r, c) && this.validate_box(r, c)){
  	  	  if (this.backtrack(r, c)) {
  	  	  	return true;
  	  	  }
  	  	}
  	  }
  	  this.working_grid[r][c] = 0;
  	  return false;
  	}
};

Solver.prototype.solve = function () {
  this.backtrack(0, -1);
};

module.exports = function solveSudoku(matrix) {
  // your solution
  let solver = new Solver();
  solver.working_grid = matrix;
  solver.solve();
  return solver.working_grid;
}