import document from "document";

let text = document.getElementById("text") as TextElement;              // not displayed, evtl inherit text/props from here
let shadow = document.getElementById("shadow") as TextElement;          // in CSS reachable as #textShadow #shadow
let highlight = document.getElementById("highlight") as TextElement;    // in CSS reachable as #textShadow #highlight
let main = document.getElementById("main") as TextElement;              // in CSS reachable as #textShadow #main



// settings text-props : evtl inherit by props on use?
text.text = "shadow-text";
text.style.fontFamily = "Barlow-Bold";
text.style.fontSize = 45;
text.textAnchor = "middle";
text.letterSpacing = 0;

// now applied per class
document.getElementsByClassName("myText").forEach((e: TextElement) => {
  e.text = text.text;
  //props
  e.style.fontFamily = text.style.fontFamily;
  e.style.fontSize = text.style.fontSize;
  e.textAnchor = text.textAnchor;
  e.letterSpacing = text.letterSpacing;
});


// individual settings for all 3 textElements, later per set? class? inline?
// offset on x,y
main.x = 0; // takes x from use
//highlight.x = - 1; // offset to main
shadow.x =  2; // offset to main

main.y = 0;
//highlight.y = - 1;
shadow.y =  2;

// fill
main.style.fill = "orange";
highlight.style.fill = "white";
shadow.style.fill = "red";

// opacity
main.style.opacity = 1; // individual opacity
highlight.style.opacity = 0.9;
shadow.style.opacity = 0.6;


