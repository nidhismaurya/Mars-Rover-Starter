const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {
//test 7
it('constructor sets position and default values for mode and generatorWatts', function() {
let initialPosition = 0;
let rover = new Rover(initialPosition);
expect(rover.position).toBe(initialPosition);
expect(rover.mode).toBe('NORMAL');
expect(rover.generatorWatts).toBe(110);
});
// test 8
it('response returned by receiveMessage contains the name of the message', function(){
let rover = new Rover(98382);
let message = {
  name: 'Test Message',
  commands: [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')]
};
let response = rover.receiveMessage(message);
expect(response.message).toBe(message.name);

});
//test 9
it ('response returned by receiveMessage includes two results if two commands are sent in the message', function(){
let rover = new Rover(98382);
let message = {
  name: "Test Message with Two Commands",
  commands: [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')]
};
let response = rover.receiveMessage(message);
expect(response.results).toHaveLength(2);

});
// test 10
it ('responds correctly to the status check command ', function(){
let rover= new Rover;
  let message  = {
  name: 'Status Check Message',
  commands: [
  { commandType: 'STATUS_CHECK' }
  ]
  };
  let response = rover.receiveMessage(message);
  let statusResult = response.results[0];
  expect(statusResult.completed).toBe(true);
  expect(statusResult.roverStatus).toEqual({
    mode: rover.mode,
    generatorWatts: rover.generatorWatts,
    position: rover.position
  });

  });
});
//test 11
it('responds correctly to the mode change command', function(){
 let rover = new Rover;
 let message = {
    name:'Mode change',
    commands: [
      { type: 'MODE_CHANGE', value: 'LOW_POWER' },
  ],
};
let statusResult = response.results[1];
expect(statusResult.completed).toBe(true);
expect(statusResult.roverStatus).toEqual({
  mode: rover.mode,
  generatorWatts: rover.generatorWatts,
  position: rover.position
});
  
});