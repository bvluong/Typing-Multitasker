
export const glow = () => {
  var middleGlow = document.getElementById('middle-glow');
  middleGlow.style.top = window.innerHeight/2-23+'px';
  middleGlow.style.left = window.innerWidth/2-23+'px';
  var middleGlow2 = document.getElementById('middle-glow-2');
  middleGlow2.style.visibility = "hidden";
  middleGlow2.style.top = window.innerHeight/9-24+'px';
  middleGlow2.style.left = window.innerWidth/5-23+'px';
  var middleGlow3 = document.getElementById('middle-glow-3');
  middleGlow3.style.visibility = "hidden";
  middleGlow3.style.top = window.innerHeight/9-23+'px';
  middleGlow3.style.left = window.innerWidth*(4/5)-24+'px';
  document.getElementById('combo-glow').style.visibility = 'hidden';
};

export const hideVisibility = () => {
  const start = document.getElementById('start');
  const instructions = document.getElementById('instructions');
  const logo = document.getElementById('logo');
  const combo = document.getElementById('combo-glow');
  start.innerHTML = 'Restart';
  start.style.visibility = "hidden";
  instructions.style.visibility = "hidden";
  document.getElementById('middle-glow-2').style.visibility = "hidden";
  document.getElementById('middle-glow-3').style.visibility = "hidden";
  logo.style.visibility = "hidden";
  combo.style.visibility = "visible";
};
