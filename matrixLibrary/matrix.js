/*

    Matrix Math Library 
    Author: Amy Burnett
    Date: January 23rd 2019

*/


const SINGLE_ROW = 1;
const SINGLE_COLUMN = 0;

class Matrix {

    // Ctor 
    // Constructs a blank (zero-valued) matrix 
    // with given dimensions
    constructor(rows, cols) {

        // Ensure given rows and columns are valid 
        if(!rows || !cols || rows <= 0 || cols <= 0){
            console.log(rows + " x " + cols + " is not a valid dimension")
            console.log("Rows/Cols must be an integer larger than 0");
            return null;
        }

        this.rows = rows;
        this.cols = cols;
        this.data;

        // initialize matrix data
        this.data = [];
        for (var i = 0; i < rows; i++) {
            this.data[i] = [];
            for (var j = 0; j < cols; j++) {
                this.data[i][j] = 0;
            }
        }

    }

    // DATA 
    // ================================================================

    setData(data) {
        if (!data || !data.length) {
            console.log("data entered is not a 2 dimensional array");
            return;
        }

        // ensure the incoming data is a correct matrix 
        for (var i = 0; i < data.length; i++) {
            if (data[i].length != data[0].length) {
                console.log("data entered is not a 2 dimensional array");
                return;
            }
        }

        // create matrix 
        this.rows = data.length;
        this.cols = data[0].length;

        this.data = data;

    }

    // Randomly generates data 
    randomize(){
        for(var i = 0; i < this.rows; i++){
            for(var j = 0; j < this.cols; j++){
                // generates a number between -1 and 1 
                this.data[i][j] = Math.random() * 2 - 1;
            }
        }
    }

    

    // Returns a copy of this matrix 
    copy(){
        
        // Creates new matrix 
        var newMatrix = new Matrix(this.rows, this.cols);

        // Copy data to new matrix 
        for(var i = 0; i < this.rows; i++){
            for(var j = 0; j < this.cols; j++){
                newMatrix.data[i][j] = this.data[i][j];
            }
        }

        return newMatrix;

    }

    // Returns this matrix transposed
    // -Rows become columns 
    // -Columns become rows
    transpose(){
       
        // Create new transposed matrix
        var transposedMatrix = new Matrix(this.cols, this.rows);

        // Transpose Data
        for(var i = 0; i < this.rows; i++){
            for(var j = 0; j < this.cols; j++){
                transposedMatrix.data[j][i] = this.data[i][j];
            }
        }

        return transposedMatrix;

    }

    // Converts this matrix to an array if there is only one column or one row
    toArray(){

        // Ensure matrix can be simplified down to an array
        // - only one column or one row
        if(this.rows != 1 && this.cols != 1){
            console.log("this matrix cannot be converted to an array");
            console.log("must have 1 row or 1 column only");
            return null;
        }

        // Convert to array 
        // 1 row
        if(this.rows == 1){

            return this.data[0];

        }

        // 1 column
        else if (this.cols == 1){

            var arr = [];

            for(var i = 0; i < this.rows; i++){
                arr[i] = this.data[i][0];
            }

            return arr;
        }

    }

    // Converts and returns an array into a matrix 
    // the array is converted from a single row to a single column by default
    // use Const SINGLE_ROW/SINGLE_COLUMN
    static fromArray(arr, type){

        // Ensure given arr exists and is valid 
        if (!arr || !Array.isArray(arr)) {
            console.log("Cannot convert to Matrix");
            console.log("an array can only be converted to a matrix")
            return;
        }

        // Single Column Format 
        if(!type || type == 0){
            // Create matrix 
            var matrix = new Matrix(arr.length, 1);

            // Add data to matrix 
            for(var i = 0; i < matrix.rows; i++){
                matrix.data[i][0] = arr[i];
            }

            return matrix;
        } 
        
        // Single Row Format
        else if (type == 1){
             // Create matrix 
             var matrix = new Matrix(1, arr.length);

             // Add data to matrix 
             for(var i = 0; i < matrix.cols; i++){
                 matrix.data[0][i] = arr[i];
             }
 
             return matrix;
        }

    }


    // MATRIX MATH 
    // ================================================================

    // Adds a scalar or another matrix to this matrix 
    // Note: this matrix is affected while the other is not
    add(n){
        // ElementWise Addition
        if(n instanceof Matrix){

            // Ensure matrices have the same dimensions
            if(n.rows != this.rows || n.cols != this.cols){
               console.log("matrices must have the same dimensions");
               console.log("to preform elementwise addition")
               console.log("this: " + this.rows + "x" + this.cols);
               console.log("addend: " + n.rows + "x" + n.cols);
                return;
            }

            // Add cooresponding elements to this matrix
            for(var i = 0; i < this.rows; i++){
                for(var j = 0; j < this.cols; j++){
                    this.data[i][j] += n.data[i][j];
                }
            }
        }

        // Scalar Addition
        else {
            for(var i = 0; i < this.rows; i++){
                for(var j = 0; j < this.cols; j++){
                    this.data[i][j] += n;
                }
            }
        }   
    }

    // Subtracts a scalar or another matrix to this matrix 
    // Note: this matrix is affected while the other is not
    subtract(n){
        // ElementWise Subtraction
        if(n instanceof Matrix){

            // Ensure matrices have the same dimensions
            if(n.rows != this.rows || n.cols != this.cols){
               console.log("matrices must have the same dimensions");
               console.log("to preform elementwise subtraction")
               console.log("this: " + this.rows + "x" + this.cols);
               console.log("addend: " + n.rows + "x" + n.cols);
                return;
            }

            // subtract cooresponding elements to this matrix
            for(var i = 0; i < this.rows; i++){
                for(var j = 0; j < this.cols; j++){
                    this.data[i][j] -= n.data[i][j];
                }
            }
        }

        // Scalar Subtraction
        else {
            for(var i = 0; i < this.rows; i++){
                for(var j = 0; j < this.cols; j++){
                    this.data[i][j] -= n;
                }
            }
        }   
    }

    // Multiplies this matrix by a scalar value or another matrix
    multiply(n){

        // ElementWise Multiplication (Hadamard Product)
        // Note: Different from Matrix Multiplication
        if(n instanceof Matrix){

            // Ensure matrices have the same dimensions
            if(n.rows != this.rows || n.cols != this.cols){
               console.log("matrices must have the same dimensions");
               console.log("to preform elementwise multiplication")
               console.log("this: " + this.rows + "x" + this.cols);
               console.log("factor: " + n.rows + "x" + n.cols);
                return;
            }

            // Add cooresponding elements to this matrix
            for(var i = 0; i < this.rows; i++){
                for(var j = 0; j < this.cols; j++){
                    this.data[i][j] *= n.data[i][j];
                }
            }
        }

        // Scalar Multiplication
        else {
            for(var i = 0; i < this.rows; i++){
                for(var j = 0; j < this.cols; j++){
                    this.data[i][j] *= n;
                }
            }
        }
    }

   

    // Tests if a given matrix equals this matrix
    equals(m){
        // Ensure that given matrix matches the dimensions of this matrix 
        if(m.rows != this.rows || m.cols != this.cols){
            return false;
        }

        // Ensure data matches 
        for(var i = 0; i < this.rows; i++){
            for(var j = 0; j < this.cols; j++){
                // Returns false if elements are not equal
                if(this.data[i][j] != m.data[i][j]){
                    return false;
                }
            }
        }
        return true;
    }

    // Applies a given function to each element of this matrix
    map(f){
        for(var i = 0; i < this.rows; i++) {
            for(var j = 0; j < this.cols; j++){
                // pass through function
                this.data[i][j] = f(this.data[i][j]);
            }
        }
    }

    // STATIC METHODS: MATH 
    // ================================================================

    // Adds a scalar to a matrix or adds two matrices together elementwise
    // note: none of the matrices are altered 
    // the result is return as a new matrix
    // first param should be the matrix 
    static add(a,b){

        // Ensure first param 
        if(!(a instanceof Matrix)){
            console.log("first param must be a matrix");
            return;
        }

        // ElementWise Addition
        if(b instanceof Matrix){

            // Ensure matrices have the same dimensions
            if(b.rows != a.rows || b.cols != a.cols){
               console.log("matrices must have the same dimensions");
               console.log("to preform elementwise addition")
               console.log("a: " + a.rows + "x" + a.cols);
               console.log("b: " + b.rows + "x" + b.cols);
                return;
            }

            // Add cooresponding elements to this matrix
            for(var i = 0; i < a.rows; i++){
                for(var j = 0; j < a.cols; j++){
                    a.data[i][j] += b.data[i][j];
                }
            }
        }

        // Scalar Addition
        else {
            for(var i = 0; i < a.rows; i++){
                for(var j = 0; j < a.cols; j++){
                    a.data[i][j] += b;
                }
            }
        }   
    }

    // Subtract a scalar to a matrix or Subtracts two matrices together elementwise
    // note: none of the matrices are altered 
    // the result is return as a new matrix
    // first param should be the matrix 
    static subtract(a,b){

        // Ensure first param 
        if(!(a instanceof Matrix)){
            console.log("first param must be a matrix");
            return;
        }

        // ElementWise Subtract
        if(b instanceof Matrix){

            // Ensure matrices have the same dimensions
            if(b.rows != a.rows || b.cols != a.cols){
               console.log("matrices must have the same dimensions");
               console.log("to preform elementwise subtraction")
               console.log("a: " + a.rows + "x" + a.cols);
               console.log("b: " + b.rows + "x" + b.cols);
                return;
            }

            var matrix = new Matrix(a.rows, a.cols);

            // subtract cooresponding elements to this matrix
            for(var i = 0; i < a.rows; i++){
                for(var j = 0; j < a.cols; j++){
                    matrix.data[i][j] = a.data[i][j] - b.data[i][j];
                }
            }

            return matrix;

        }

        // Scalar Subtraction
        else {

            var matrix = new Matrix(a.rows, a.cols);

            for(var i = 0; i < a.rows; i++){
                for(var j = 0; j < a.cols; j++){
                    matrix.data[i][j] = a.data[i][j] - b;
                }
            }

            return matrix;

        }   
    }

    // Multiplies a matrix by a scalar value or another matrix
    // uses hadamard product 
    // returns the new matrix 
    static multiply(a, b){

        // Ensure params are matrices
        if(!(a instanceof Matrix)){
            console.log("must input a matrix");
            return;
        }

        // ElementWise Multiplication (Hadamard Product)
        // Note: Different from Matrix Multiplication
        if(b instanceof Matrix){

            // Ensure matrices have the same dimensions
            if(b.rows != a.rows || b.cols != a.cols){
            console.log("matrices must have the same dimensions");
            console.log("to preform elementwise multiplication")
            console.log("a: " + a.rows + "x" + a.cols);
            console.log("b: " + b.rows + "x" + b.cols);
                return;
            }

            // create new matrix for multiplication
            var matrix = new Matrix(a.rows, a.cols);

            // Add cooresponding elements to this matrix
            for(var i = 0; i < a.rows; i++){
                for(var j = 0; j < a.cols; j++){
                    matrix.data[i][j] = a.data[i][j] * b.data[i][j];
                }
            }

            return matrix;

        }

        // Scalar Multiplication
        else {

            
            // create new matrix for multiplication
            var matrix = new Matrix(a.rows, a.cols);

            for(var i = 0; i < a.rows; i++){
                for(var j = 0; j < a.cols; j++){
                    matrix.data[i][j] = a.data[i][j] * b;
                }
            }

            return matrix;

        }
    }

    // Multiplies two given matrices together 
    // Using the matrix product method
    static product(a, b){
        // Ensure given are matrices 
        if(a instanceof Matrix && b instanceof Matrix){

            // Ensure Matrix Multiplication can be applied
            // - Columns of 'a' must equal rows of 'b'
            if(a.cols == b.rows){

                // Create Product matrix
                // - with rows of 'a' and columns of 'b'
                var product = new Matrix(a.rows, b.cols);

                // Each row of 'a' multiplied by each column of 'b'
                for(var i = 0; i < a.rows; i++){
                    for(var j = 0; j < b.cols; j++){

                        // dot-product
                        // each elem in 'a's row are
                        // multiplied by cooresponding elements in 'b's column
                        // and added together 
                        for(var elem = 0; elem < a.cols; elem++){
                            product.data[i][j] += a.data[i][elem] * b.data[elem][j]; 
                        }

                    }
                }

                return product;

            }

        }


    }

    // Returns given matrix transposed
    // -Rows become columns 
    // -Columns become rows
    static transpose(m){
       
        // Create new transposed matrix
        var transposedMatrix = new Matrix(m.cols, m.rows);

        // Transpose Data
        for(var i = 0; i < m.rows; i++){
            for(var j = 0; j < m.cols; j++){
                transposedMatrix.data[j][i] = m.data[i][j];
            }
        }

        return transposedMatrix;

    }

    // Applies a given function to elements of a given matrix
    // returns a new matrix of the application
    // Note: original matrix is unnaffected
    static map(m, fn){

        var matrix = new Matrix(m.rows, m.cols);

        for(var i = 0; i < m.rows; i++) {
            for(var j = 0; j < m.cols; j++){
                // pass through function
                matrix.data[i][j] = fn(m.data[i][j]);
            }
        }

        return matrix;

    }

    // PRINTING 
    // ================================================================

    // Prints the matrix in a row/column format
    print() {
        var output = "";
        for (var i = 0; i < this.rows; i++) {
            for (var j = 0; j < this.cols; j++) {
                output += this.data[i][j] + " ";
            }
            output += "\n";
        }

        console.log(output);
    }


}