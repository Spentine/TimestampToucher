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
    
    return [hourElement, minuteElement, secondElement];
  }
  
  const [hour, minute, second] = addMainContent();
  
  function updateMainContent() {
    const currentHour = new Date().getHours();
    const currentMinute = new Date().getMinutes();
    const currentSecond = new Date().getSeconds();
    
    hour.textContent = String(currentHour).padStart(2, "0");
    minute.textContent = String(currentMinute).padStart(2, "0");
    second.textContent = String(currentSecond).padStart(2, "0");
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
    mainContent.style.fontSize = `16${unit}`;
    
    updateMainContent();

    window.requestAnimationFrame(render);
  }
  render();
  
  function clicked(event) {
    event.preventDefault();
    console.log("clicked", event);
  }
  
  mainButton.addEventListener("mousedown", clicked);
  mainButton.addEventListener("touchstart", clicked);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", main);
} else {
  main();
}