import { outbox } from "file-transfer";

export interface ShadowTextWidget extends GraphicsElement {  // this is REALLY strange.
  //textAnchor: string;
  text: string;             // enables to set text attributes on shadowText directly
  letterSpacing: number;
  textAnchor: "start" | "middle" | "end";
  
  mainT: RectElement;   // very ugly, but allows to ristrict props. strange: text is still applicable
  light: RectElement;
  shadowT: RectElement;

  redraw();

  /*
  main : Style ['fill'], ['opacity'], ['display']; // for string not available....
  light: Style ['fill'], ['opacity'], ['display'], ['x'], ['y'];
  shadow: Style ['fill'], ['opacity'], ['display'], ['x'], ['y'];
  */
}


const construct = (el: ShadowTextWidget) => {

  const textEl = el.getElementById('text') as TextElement;
  const lightEl = el.getElementById('highlight')as TextElement;
  const shadowEl = el.getElementById('shadow') as TextElement;
  const mainEl = el.getElementById('main') as TextElement;
  //let mainS = el.getElementById("mainS") as RectElement
  

  // PRESETS
  // textEl.textAnchor = textEl.textAnchor ?? "start"; // grrrrrr..... error if undefined
  mainEl.x = mainEl.y = 0; // so "main" allways is at x,y of the <use>
  lightEl.x = lightEl.x ?? -1;
  lightEl.y = lightEl.y ?? -1;
  shadowEl.x = shadowEl.x ?? 2;
  shadowEl.y = shadowEl.y ?? 2;
  shadowEl.style.opacity = shadowEl.style.opacity ?? 0.5;
  mainEl.style.fill = mainEl.style.fill ?? "grey";
  lightEl.style.fill = lightEl.style.fill ?? "white";
  shadowEl.style.fill = shadowEl.style.fill ?? "red";





  // PRIVATE FUNCTIONS
  // Because the widget is a closure, functions declared here aren't accessible to code outside the widget.
  
    
  el.redraw = () => { 
        
      el.getElementsByClassName("myText").forEach((e: TextElement) => {
          e.text = textEl.text ?? ""; 
          e.textAnchor = textEl.textAnchor; // preset in widget css now?
          e.letterSpacing = textEl.letterSpacing ?? 0;
          //console.log(el.main.textAnchor) // all to "default" outer settings overridden :(
      });
  };

  el.redraw();


    //As try/catch(e) overrides ALL textAnchor, if only one is undefined (???) seems to be necessary to set textAnchor for each use in svg manually to start
    //TODO add new simple file to test all settings/errors from scratch now, after textAnchor no longer presetted in css
  



  Object.defineProperty(el, 'text', {
      set: function (newValue) {
        textEl.text = newValue;
        el.redraw();
      }
  });

  Object.defineProperty(el, 'textAnchor', {
      set: function (newValue) {
      textEl.textAnchor = newValue ?? "start";
      el.redraw();
      }
  });

  Object.defineProperty(el, 'letterSpacing', {
      set: function (newValue) {
        textEl.letterSpacing = newValue;
        el.redraw();    
      }
  });

  // add subElements and export as mainElement to be able to style as myText.subElement.style.string
  // redraw if newValue (hardcoded values are also settable on subs in .ts, but won´t get redrawn) - // TODO NOT nice. possible to exclude them?

  Object.defineProperty(el, 'mainT', {
    get: function() {return mainT;}
  }); 
  
  const mainT = {
    get style() {
      return mainEl.style;
    },    
  };

  



 // get style() and hopefully position() on subElement #light
  Object.defineProperty(el, 'light', {
    get: function () { return light; }
  });   

  const light = {
    get position() {
      return lightEl.x, lightEl.y; // why dosn´t position() pass the values to my lightEl???
    },
    get style() {
      return lightEl.style;
    }
  };
  
 console.log(`${lightEl.parent.id} light.x: ${lightEl.x}`)  

  



const shadowT = {
  get style() {
    return shadowEl.style;
  } 
};
  Object.defineProperty(el, 'shadowT', {
    get: function() { return shadowT;}   
});   
  


//TODO compare el.redraw and set/get update();
  return el;
}



export const shadowText = () => {
  // Returns an object that provides the name of this widget and a function that can be used to construct them.
  // This is used internally by widget-factory.ts.
  return {
      name: 'shadowText',
      construct: construct
  }
}


//TODO back to prev solution? don´t find outbox, how to access x,y this way