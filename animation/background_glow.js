
export const glow = () => {
  var middleGlow = document.getElementById('middle-glow');
  middleGlow.style.top = window.innerHeight/2-28+'px';
  middleGlow.style.left = window.innerWidth/2-30+'px';
  var middleGlow2 = document.getElementById('middle-glow-2');
  middleGlow2.style.top = window.innerHeight/9-26+'px';
  middleGlow2.style.left = window.innerWidth/5-26+'px';
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
  logo.style.visibility = "hidden";
  combo.style.visibility = "visible";
};
