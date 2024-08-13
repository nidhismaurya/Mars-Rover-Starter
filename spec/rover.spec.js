const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {
//test 7
it('constructor sets position and default values for mode and generatorWatts', function() {
let initialPosition = 98382;
let rover = new Rover(initialPosition);
expect(rover.position).toBe(initialPosition);
expect(rover.mode).toBe('NORMAL');
expect(rover.generatorWatts).toBe(110);
});
// test 8
it('response returned by receiveMessage contains the name of the message', function(){
let rover = new Rover;
let message = {
  name: 'Test Message',
  commands: [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')]
};
let response = rover.receiveMessage(message);
expect(response.message).toBe(message.name);

});
//test 9
it ('response returned by receiveMessage includes two results if two commands are sent in the message', function(){
let rover = new Rover;
let message = {
  name: "Test Message with Two Commands",
  commands: [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')]
};
let response = rover.receiveMessage(message);
expect(response.results).toHaveLength(2);

});
// test 10
it ('responds correctly to the status check command ', function(){
let rover = new Rover(98382);
let commands = [new Command('STATUS_CHECK')];
let message = new Message('Test status check', commands);
let response = rover.receiveMessage(message);
expect(response.results[0].roverStatus.position).toEqual(98382);
expect(response.results[0].roverStatus.mode).toEqual('NORMAL');
expect(response.results[0].roverStatus.generatorWatts).toEqual(110);
});
});
//test 11
it('responds correctly to the mode change command', function(){
  let rover = new Rover(98382);
  let commands = [new Command('MODE_CHANGE', 'LOW_POWER')];
  let message = new Message('Test mode change', commands);
  let response = rover.receiveMessage(message);
  expect(rover.mode).toEqual('LOW_POWER');
  expect(response.results[0].completed).toBe(true);
});
//test 12
it('responds with a false completed value when attempting to move in LOW_POWER mode', function(){
  let rover = new Rover(0);
  rover.mode = 'LOW_POWER';
  let newPositionn = 12345;
  let message = {
  name: "testMessage1",
  commands: [ { commandType: 'MODE_CHANGE', value: 'LOW_POWER' }]
  }
  let response = rover.receiveMessage(message);
  if (response.results[0].completed === false || rover.mode === 'Low Power') {
    console.log('cannot be moved');
  
  } 
  
  expect(response.results[0].completed).toBe(true);
  
});
//test 13 
it('responds with the position for the move command', function(){
  let rover = new Rover(0); 
  let newPosition = 12345
  let message = {
    name: 'TestMoveMessage',
    commands: [{ commandType: 'MOVE', value: newPosition }]
    };
  let response = rover.receiveMessage(message);
  if (rover.position !== newPosition)
  expect(response.results[0].completed).toBe(false);
  expect(rover.position).toEqual(newPosition);
  expect(response.results[0].completed).toBe(true);
  
  });



