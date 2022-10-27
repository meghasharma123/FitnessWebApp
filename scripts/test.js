function testPrint() {
  document.getElementById("program").innerHTML =
  "Here's a " + minutesOut + " minute " +
  levelsOut + " " + typesOut + " workout with " +
  barsOut + " pullups.";
}

function testArray () {
  exerShuffle = pushExercises.sort(() => 0.5 - Math.random());
  console.log(exerShuffle[0][0]);
}
