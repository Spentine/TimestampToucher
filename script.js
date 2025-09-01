function main() {
  const mainButton = document.getElementById("mainButton");
  const mainText = document.getElementById("mainText");
  const clickEffect = document.getElementById("clickEffect");
  
  let unit = "dvw";
  
  function render() {
    // keep the button in bounds
    const bounds = mainButton.getBoundingClientRect();
    // console.log(bounds);
    
    if (bounds.top < 0) {
      unit = "dvh";
    } else if (bounds.top > 0 || bounds.width !== bounds.height) {
      unit = "dvw";
    }
    mainButton.style.width = `100${unit}`;
    mainButton.style.height = `100${unit}`;
    mainButton.style.borderRadius = `50${unit}`;
    mainText.style.fontSize = `16${unit}`;

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