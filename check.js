const Check = function(val) {
  Check.val = val;
  Check.on.val = null;
  Check.of.val = null;
  Check.valence = true;
  return Check;
};
Check.on = function(val) {
  Check.on.val = val;
  return Check;
};
Check.of = function(...val) {
  Check.of.val = val;
  if (typeof Check.val === "function") {
    try {Check.target = Check.val.apply(Check.on.val, Check.of.val);}
    catch(e) {Check.target = e;}
  }
  return Check;
};
Check.not = function() {
  Check.valence = !Check.valence;
  return Check;
};
Check.actual = function() {
  if (typeof Check.val === "function") {
    try {return Check.val.apply(Check.on.val, Check.of.val);}
    catch(e) {return e;}
  }
  return Check.val;
}
Check.is = function(val) {
  if (Number.isNaN(val)) {
    if (Number.isNaN(Check.actual()) === Check.valence) Check.showPass();
    else Check.showFail();
  }
  else {
    if ((Check.actual() === val) === Check.valence) Check.showPass();
    else Check.showFail();
  }
  return Check;
};
Check.equals = function(val) {
  if ((JSON.stringify(Check.actual()) === JSON.stringify(val)) === Check.valence) Check.showPass();
  else Check.showFail();
  return Check;
};
Check.throws = function() {
  if ((Check.actual() instanceof Error) === Check.valence) Check.showPass();
  else Check.showFail();
  return Check;
}
Check.showPass = function() {
  console.log("\x1b[32m%s\x1b[0m", "\u2714 Pass");
};
Check.showFail = function() {
  console.log("\x1b[31m%s\x1b[0m", "\u2718 Fail");
};
