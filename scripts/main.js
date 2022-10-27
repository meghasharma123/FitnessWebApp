window.onload = function(){
  // Manage input selections
  minutesIn = document.getElementById("listMinutes");
  levelsIn = document.getElementById("listLevels");
  typesIn = document.getElementById("listTypes");
  barsIn = document.getElementById("listBars");

  // Get changed values
  function onChange() {
    minutesOut = minutesIn.value;
    levelsOut = levelsIn.value;
    typesOut = typesIn.value;
    barsOut = barsIn.value;
    // If whole or upper-body, show pullups
    if (typesOut=="whole" || typesOut=="upper") {
      document.getElementById("pullupBar").classList.remove('hidden');
    } else {
      document.getElementById("pullupBar").classList.add('hidden');
    }
  }

  // Monitor changes
  minutesIn.onchange = onChange;
  levelsIn.onchange = onChange;
  typesIn.onchange = onChange;
  barsIn.onchange = onChange;
  onChange();

  // Build workout
  document.getElementById("makeWorkout").onclick=function(){buildWorkout()};
}
