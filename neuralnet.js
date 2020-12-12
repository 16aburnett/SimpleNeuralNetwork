// Created By Amy Burnett


class NeuralNetwork{

    // Constructs the neural network
    // params - input, hidden, output
    constructor(inputCount, hiddenCount, outputCount){

        this.inputCount = inputCount;
        this.hiddenCount = hiddenCount;
        this.outputCount = outputCount;

        // weights 
        this.weights_ih = new Matrix(hiddenCount, inputCount);
        this.weights_ih.randomize();
        this.weights_ho = new Matrix(outputCount, hiddenCount);
        this.weights_ho.randomize();

        // bias
        // one bias for each layer
        // connected to each of the next layer
        this.bias_ih = new Matrix(hiddenCount, 1);
        this.bias_ih.randomize();
        this.bias_ho = new Matrix(outputCount, 1);
        this.bias_ho.randomize();
        
        // previous node values 
        this.hidden_nodes;
        this.output_nodes;

        this.learning_rate = 0.1;


    }

    // Feed Forward Algorithm
    // Feeds input through neural network to arive at an output
    // param inputs - must be an array of desired inputs. (must be size of inputCount)
    feedForward(inputsArr){

        // Ensure inputs are valid 
        if(!inputsArr || !Array.isArray(inputsArr)){
            console.log("please enter a valid array of input");
            return;
        } 

        // convert input array to matrix 
        var input_nodes = Matrix.fromArray(inputsArr);

        // Input to Hidden Feed
        // activation(weights * inputs + bias)
        this.hidden_nodes = Matrix.product(this.weights_ih, input_nodes); // weighted sum
        this.hidden_nodes.add(this.bias_ih);// adding bias
        this.hidden_nodes.map(sigmoid); // applying activation function


        // Hidden to Output Feed
        this.output_nodes = Matrix.product(this.weights_ho, this.hidden_nodes);// weighted sum
        this.output_nodes.add(this.bias_ho); // adding bias
        this.output_nodes.map(sigmoid) // applying activation function

        // convert output into array 
        var output = this.output_nodes.toArray();
        return output;

    }

    // TRAINING NEURAL NETWORK
    // feeds forward a given input
    // changes weights if output doesnt match given expected answer 
    // uses stochastic gradient descent - alters weights after each feed forward
    train(inputs_arr, answers_arr){

        // Convert params to matrices 
        var inputs = Matrix.fromArray(inputs_arr);
        var outputs = Matrix.fromArray(this.feedForward(inputs_arr));
        var answers = Matrix.fromArray(answers_arr);

        // calculate error <output>
        // error = answer - output
        var output_errors = Matrix.subtract(answers, outputs);

        // Calculate Hidden Errors (hidden -> output)
        var weights_ho_t = Matrix.transpose(this.weights_ho);
        var hidden_errors = Matrix.product(weights_ho_t, output_errors);

        // Calculate Change in Weights hidden -> output
        var hidden_gradients = Matrix.multiply(output_errors, Matrix.map(outputs, dsigmoid));
        var hidden_nodes_t = Matrix.transpose(this.hidden_nodes);
        var delta_weights_ho = Matrix.product(hidden_gradients, hidden_nodes_t);
        delta_weights_ho.multiply(this.learning_rate);
        var delta_bias_ho = Matrix.multiply(hidden_gradients, this.learning_rate);

        // Change weights
        this.weights_ho.add(delta_weights_ho);
        this.bias_ho.add(delta_bias_ho);

        // Calculate Change in Weights input -> hidden
        var input_gradients = Matrix.multiply(hidden_errors, Matrix.map(this.hidden_nodes, dsigmoid));
        var input_nodes_t = Matrix.transpose(inputs);
        var delta_weights_ih = Matrix.product(input_gradients, input_nodes_t);
        delta_weights_ih.multiply(this.learning_rate);
        var delta_bias_ih = Matrix.multiply(input_gradients, this.learning_rate);

        // Change weights
        this.weights_ih.add(delta_weights_ih);
        this.bias_ih.add(delta_bias_ih);

    }
    

}

// ACTIVATION FUNCTION
    // sigmoid:
    // 1 / (1 + e^-x)
    function sigmoid(x){
        return (1) / (1 + Math.pow(Math.E, -x));
    }

    // derivative of sigmoid 
    // this is not the full derivative because 
    // it is used after sigmoid is already applied
    // dsigmoid(x) = sigmoid(x) / (1 - sigmoid(x));
    function dsigmoid(x){
        return (x * (1 - x));
    }