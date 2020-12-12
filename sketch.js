// Created By Amy Burnett

window.onload = function () {

    var content = document.getElementById("content");

    var header = document.createElement('h1');
    header.textContent = "Neural Network trained for the XOR problem";
    content.appendChild(header);

    var name = document.createElement('h3');
    name.textContent = "By Amy Burnett";
    content.appendChild(name);
    
    var text = document.createElement('p');
    text.textContent = "The XOR problem is not linearly seperable and therefore cannot be solved with a single perceptron";
    content.appendChild(text);

    // 1 hidden node can only handle linear seperable 
    // problems so for AND that would be okay
    // but the XOR problem wouldnt work well 
    // even with 10,000 training cycles
    var num_input = 2; 
    var num_hidden = 10;
    var num_outputs = 1;

    text = document.createElement('p');
    text.textContent = `creating Neural Network with ${num_input} inputs, ${num_hidden} hiddens, and ${num_outputs} outputs`;
    content.appendChild(text);
    
    var nn = new NeuralNetwork(num_input, num_hidden, num_outputs);

    // XOR Problem
    var training_data = [
        {
            inputs: [1, 1],
            answers: [0]
        },
        {
            inputs: [1, 0],
            answers: [1]
        },
        {
            inputs: [0, 1],
            answers: [1]
        },
        {
            inputs: [0, 0],
            answers: [0]
        }
    ];

    text = document.createElement('p');
    text.textContent = "Training...";
    content.appendChild(text);

    for (var i = 0; i < 10000; ++i) {
        var random_index = Math.floor((Math.random() * 4));
        var data = training_data[random_index];
        nn.train(data.inputs, data.answers);
    }


    text = document.createElement('p');
    text.textContent = "Let's see if it gets it correct!";
    content.appendChild(text);

    var outputs = nn.feedForward([1,1]);
    
    text = document.createElement('p');
    text.textContent = `predict([1, 1]) -> ${outputs[0] >= 0.5}`;
    content.appendChild(text);
    text = document.createElement('p');
    text.textContent = "expected -> false";
    content.appendChild(text);
    
    outputs = nn.feedForward([1,0]);

    text = document.createElement('p');
    text.textContent = `predict([1, 0]) -> ${outputs[0] >= 0.5}`;
    content.appendChild(text);
    text = document.createElement('p');
    text.textContent = "expected -> true";
    content.appendChild(text);
    
    outputs = nn.feedForward([0,1]);

    text = document.createElement('p');
    text.textContent = `predict([0, 1]) -> ${outputs[0] >= 0.5}`;
    content.appendChild(text);
    text = document.createElement('p');
    text.textContent = "expected -> true";
    content.appendChild(text);
    
    outputs = nn.feedForward([0,0]);
    
    text = document.createElement('p');
    text.textContent = `predict([0, 0]) -> ${outputs[0] >= 0.5}`;
    content.appendChild(text);
    text = document.createElement('p');
    text.textContent = "expected -> false";
    content.appendChild(text);

}