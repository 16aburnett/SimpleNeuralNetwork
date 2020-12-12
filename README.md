# SimpleNeuralNetwork
Simple Neural Network program that I developed in Javascript

The [website](https://16aburnett.github.io/SimpleNeuralNetworkJS/) demonstrates the Neural Network being trained and tested on the XOR problem. 

If you access the console on the website, you should be able to create a neural network with 
```javascript
var nn = new NeuralNetwork(num_inputs, num_hiddens, num_outputs);
``` 
From there you can train 1 time step at a time with 
```javascript
nn.train(inputs, expected_outputs);
```
Where the inputs and expected_outputs are lists that should match the dimensions of num_inputs and num_outputs that was specified when creating the network.
After training, you can make the neural network predict by using 
```javascript
var predicted_outputs = nn.feedForward(inputs);
```
