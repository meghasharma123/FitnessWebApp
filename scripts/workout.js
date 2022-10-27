// Pick the number of sets based on selected minutes
function pickSets(minutes) {
  if (minutes==5) {
    setsTotal = 1;
  } else if (minutes==10) {
    // Choose sets based on a random number within a range
    setsTotal = Math.floor(Math.random() * (4 - 2) ) + 2;
  } else if (minutes==15) {
    setsTotal = Math.floor(Math.random() * (5 - 3) ) + 3;
  } else if (minutes==20) {
    setsTotal = Math.floor(Math.random() * (6 - 4) ) + 4;
  } else {
    setsTotal = Math.floor(Math.random() * (7 - 5) ) + 5;
  }
}

// Pick the number of exercises and rep ranges based on level
function pickLevel(level) {
  if (level=="beginner") {
    numExercises = 4
    minLoc = 1
    maxLoc = 2
  } else if (level=="intermediate") {
    numExercises = 4
    minLoc = 3
    maxLoc = 4
  } else {
    numExercises = 5
    minLoc = 5
    maxLoc = 6
  }
}

// Filter out exercises by difficulty level
function filterExercises(exercise, level) {
  let levelExercise = [];
  if (level == "beginner") {
    for (let i = 0; i < exercise.length; i++) {
        if (exercise[i][7] == "beginner") {
            levelExercise.push(exercise[i]);
        }
    }
  } else if (level == "intermediate") {
    for (let i = 0; i < exercise.length; i++) {
        if (exercise[i][7] != "advanced") {
            levelExercise.push(exercise[i]);
        }
    }
  } else {
    for (let i = 0; i < exercise.length; i++) {
        levelExercise.push(exercise[i]);
    }
  }
  return levelExercise;
};

// Pick filters
function pickFilters(level) {
  legFilter = filterExercises(legExercises, levelsOut);
  coreFilter = filterExercises(coreExercises, levelsOut);
  pushFilter = filterExercises(pushExercises, levelsOut);
  pullFilter = filterExercises(pullExercises, levelsOut);
  fullFilter = filterExercises(fullExercises, levelsOut);
}

// Pick the exercises based on the selected type and pullup bar usability
function pickExercises(type) {
  if (type=="lower") {
    exerShuffle = legFilter.sort(() => 0.5 - Math.random());
  } else if (type=="core") {
    exerShuffle = coreFilter.sort(() => 0.5 - Math.random());
  } else if (type=="upper") {
    // Check if a pullup bar is usable
    if (barsOut==1) {
      upperExercises = pushFilter.concat(pullFilter);
      exerShuffle = upperExercises.sort(() => 0.5 - Math.random());
    } else {
      exerShuffle = pushFilter.sort(() => 0.5 - Math.random());
    }
  } else {
    // Shuffle each exercise deck
    fullShuffle = fullFilter.sort(() => 0.5 - Math.random());
    legShuffle = legFilter.sort(() => 0.5 - Math.random());
    coreShuffle = coreFilter.sort(() => 0.5 - Math.random());
    pushShuffle = pushFilter.sort(() => 0.5 - Math.random());
    pullShuffle = pullFilter.sort(() => 0.5 - Math.random());
    // Pick one from each to form a whole body routine
    // Hacky check for qualifying full body exercises
    if (fullShuffle.length < 2) {
      wholeExercises = [legShuffle[0], legShuffle[1], coreShuffle[0], coreShuffle[1], pushShuffle[0]];
    } else {
      wholeExercises = [fullShuffle[0], fullShuffle[1], legShuffle[0], coreShuffle[0], pushShuffle[0]];
    }
    // Check for pullups
    if (barsOut==1) {
      wholeExercises.push(pullShuffle[0]);
    }
    exerShuffle = wholeExercises.sort(() => 0.5 - Math.random());
  }
}

// Check true length
function defineTrueLength(total, exercises) {
  // hacky way to get length
  let trueLength = 0;
  exerLength = exerShuffle.length;
  if (exerLength < total) {
    trueLength = exerLength;
  } else {
    trueLength = total;
  }
  return trueLength;
}


// Pick the reps based on exercise and level
function pickReps(total, exercises) {
  exerReps = [];
  i = 0;
  while (i < total) {
    minRep = exercises[i][minLoc];
    maxRep = exercises[i][maxLoc];
    exerReps.push(Math.floor(Math.random() * (maxRep - minRep) ) + minRep);
    i++;
  }
}

// Generate the written program based on sets, exercises, and reps
function buildProgram(sets, total, exercises, reps) {
  // Check if singular or plural
  if (sets > 1) {
    singularOrPlural = "sets"
  } else {
    singularOrPlural = "set"
  }
  bodyProgram = "Here is the exercise you can follow today: Do " + sets + " " + singularOrPlural + " of:<br>";
  // Iterate through reps & exercises
  j = 0
  while (j < total) {
    bodyProgram += reps[j] + " " + exercises[j][0] + "<br>";
    j++;
  }
}

function buildWorkout() {
  pickSets(minutesOut);
  pickLevel(levelsOut);
  pickFilters(levelsOut);
  pickExercises(typesOut);
  trueLength = defineTrueLength(numExercises, exerShuffle);
  pickReps(trueLength, exerShuffle);
  buildProgram(setsTotal, trueLength, exerShuffle, exerReps);
  // Print the program
  document.getElementById("program").innerHTML = bodyProgram;
}
