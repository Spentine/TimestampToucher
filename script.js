function main() {
  const buttonContainer = document.getElementById("buttonContainer");
  const mainButton = document.getElementById("mainButton");
  const mainContent = document.getElementById("mainContent");
  const clickEffectContainer = document.getElementById("clickEffectContainer");
  
  function addMainContent() {
    const elementType = "div";
    const hourElement = document.createElement(elementType);
    const minuteElement = document.createElement(elementType);
    const secondElement = document.createElement(elementType);
    
    hourElement.classList.add("number");
    minuteElement.classList.add("number");
    secondElement.classList.add("number");
    
    const colon1 = document.createElement(elementType);
    const colon2 = document.createElement(elementType);

    colon1.classList.add("colon");
    colon2.classList.add("colon");

    colon1.textContent = ":";
    colon2.textContent = ":";

    mainContent.appendChild(hourElement);
    mainContent.appendChild(colon1);
    mainContent.appendChild(minuteElement);
    mainContent.appendChild(colon2);
    mainContent.appendChild(secondElement);
    
    return [hourElement, minuteElement, secondElement, colon1, colon2];
  }
  
  const [hourElement, minuteElement, secondElement, colon1, colon2] = addMainContent();
  
  const clickEffects = [];
  const disappearTime = 500;
  function updateClickEffects() {
    const bounds = clickEffectContainer.getBoundingClientRect();
    for (let i = 0; i < clickEffects.length; i++) {
      const effect = clickEffects[i];
      const elapsed = (Date.now() - effect.time) / disappearTime;
      
      // remove if expired
      if (elapsed > 1) {
        effect.element.remove();
        clickEffects.splice(i, 1);
        i--;
      }
      
      effect.element.style.opacity = (1 - elapsed) / 10;
      const width = bounds.width * elapsed;
      effect.element.style.width = `${width}px`;
      effect.element.style.height = `${width}px`;
      effect.element.style.left = `${(effect.x * bounds.width) - (width / 2)}px`;
      effect.element.style.top = `${(effect.y * bounds.height) - (width / 2)}px`;
      effect.element.style.borderRadius = `${width / 2}px`;
    }
  }
  
  function createClickEffect(position) {
    const effect = document.createElement("div");
    effect.classList.add("clickEffect");
    clickEffectContainer.appendChild(effect);
    
    const bounds = clickEffectContainer.getBoundingClientRect();
    clickEffects.push({
      x: ((position.x - bounds.left) / bounds.width),
      y: ((position.y - bounds.top) / bounds.height),
      time: Date.now(),
      element: effect
    });
  }
  
  let stopped = false;
  
  function getTime() {
    const currentHour = new Date().getHours();
    const currentMinute = new Date().getMinutes();
    const currentSecond = new Date().getSeconds();
    
    return [
      String(currentHour).padStart(2, "0"),
      String(currentMinute).padStart(2, "0"),
      String(currentSecond).padStart(2, "0")
    ];
  }
  
  function updateMainContent() {
    if (stopped) {
      // add .stopped class
      hourElement.classList.add("stopped");
      minuteElement.classList.add("stopped");
      secondElement.classList.add("stopped");
      colon1.classList.add("stopped");
      colon2.classList.add("stopped");
      return;
    }
    
    // remove .stopped class
    hourElement.classList.remove("stopped");
    minuteElement.classList.remove("stopped");
    secondElement.classList.remove("stopped");
    colon1.classList.remove("stopped");
    colon2.classList.remove("stopped");
    
    const [hour, minute, second] = getTime();
    
    hourElement.textContent = hour;
    minuteElement.textContent = minute;
    secondElement.textContent = second;
  }
  
  updateMainContent();
  
  let unit = "dvw";
  function render() {
    // keep the button in bounds
    const bounds = buttonContainer.getBoundingClientRect();
    
    if (bounds.top < 0) {
      unit = "dvh";
    } else if (bounds.top > 0 || bounds.width !== bounds.height) {
      unit = "dvw";
    }
    
    buttonContainer.style.width = `100${unit}`;
    buttonContainer.style.height = `100${unit}`;
    mainButton.style.width = `80${unit}`;
    mainButton.style.height = `80${unit}`;
    mainButton.style.borderRadius = `40${unit}`;
    clickEffectContainer.style.width = `80${unit}`;
    clickEffectContainer.style.height = `80${unit}`;
    clickEffectContainer.style.borderRadius = `40${unit}`;
    mainContent.style.fontSize = `16${unit}`;
    
    // update time
    updateMainContent();
    
    // update click effects
    updateClickEffects();
    
    window.requestAnimationFrame(render);
  }
  render();
  
  function clicked(clickX, clickY) {
    console.log("click position", clickX, clickY);
    createClickEffect({ x: clickX, y: clickY });
    
    if (!stopped) {
      stopped = true;
      
      const [hour, minute, second] = getTime();
      const timeString = `${hour}:${minute}:${second}`;
      
      // copy current time to clipboard
      navigator.clipboard.writeText(timeString);
      
      // show confirmation
      alert(timeString);
    } else {
      stopped = false;
    }
  }
  
  mainButton.addEventListener("mousedown", (event) => {
    const clickX = event.clientX;
    const clickY = event.clientY;
    event.preventDefault();
    clicked(clickX, clickY);
  });
  mainButton.addEventListener("touchstart", (event) => {
    const touchX = event.touches[0].clientX;
    const touchY = event.touches[0].clientY;
    event.preventDefault();
    clicked(touchX, touchY);
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", main);
} else {
  main();
}