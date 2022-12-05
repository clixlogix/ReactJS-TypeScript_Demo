import React, { useEffect, useState } from "react";
import customThemeStyles from "../theme/customeThemeStyles";
type ColorPalettePropType = {
  palette: string;
  placeValue: number;
  keyName: string;
  outerIndex: number;
  index: number;
  str: string;
  values: any;
  
};
const ColorPalette = ({
  palette,
  placeValue,
  keyName,
  outerIndex,
  index,
  str,
  values,
}: ColorPalettePropType) => {
  const customThemeClasses = customThemeStyles();
  const [R, setR] = useState<number>();
  const [G, setG] = useState<number>();
  const [B, setB] = useState<number>();
  const [A, setA] = useState<number>();
  const [style, setStyle] = useState<any>({});
  useEffect(() => {
   
    if (palette && palette !== undefined) {
      let arr: string[] = [];
      var regex = /(\w|\s)*\w(?=")|\w+/g;
      var data = palette?.match(regex);//This convert the string into the array of values 
      data?.map((x: any) => {
        x.split(" ").map((y: any) => {
          arr.push(y);
        });
      });
      if (typeof parseInt(arr[0]) === "number") {
        let r = arr[0] === "NaN" ? 0 : parseInt(arr[0]);
        let g = arr[1] === "NaN" ? 0 : parseInt(arr[1]);
        let b = arr[2] === "NaN" ? 0 : parseInt(arr[2]);
        let a = arr[3] === "NaN" ? 0 : parseInt(arr[3]);
        console.log(r, g, b, a)
        if ((r || r === 0) && (b || b === 0) && (g || g === 0) && (a || a === 0)) {
          setR(r);
          setG(g);
          setB(b);
          setA(a);
        }
      }
    } else {
      setR(undefined);
      setG(undefined);
      setB(undefined);
      setA(undefined);
      let elementR:any = document.getElementById(`${str}${outerIndex}${index}RPalatte${placeValue}`)
      if (elementR) {
          elementR.value = null
      }
      let elementG:any = document.getElementById(`${str}${outerIndex}${index}GPalatte${placeValue}`)
      if (elementG) {
          elementG.value = null
      }
      let elementB:any = document.getElementById(`${str}${outerIndex}${index}BPalatte${placeValue}`)
      if (elementB) {
          elementB.value = null
      }
      let elementA:any = document.getElementById(`${str}${outerIndex}${index}APalatte${placeValue}`)
      if (elementA) {
          elementA.value = null
      }
      
      
    }
  }, [palette]);

  useEffect(() => {
    if ((!R && R === undefined) && (!G && G === undefined) && (!B && B === undefined) && (!A && A === undefined)) {
      setStyle({ background: `rgb(255,255,255)` });
    } else {
      let data = {R,G, B, A};
      values(data, placeValue, keyName, outerIndex, index, values);
      setStyle({
        background: `rgba(${R},${G},${B},${A})`,
      });
    }
  }, [R, G, B, A]);

  return (
    <div className={customThemeClasses.colorBoxContainer}>
      <div className={customThemeClasses.colorFieldWrp}>
        <div className={customThemeClasses.colorPickerWrp}>
          <span
            style={style}
            className={customThemeClasses.colorPickerBox}
          ></span>
          <span className={customThemeClasses.RGB}>RGBA</span>
        </div>
        <div className={customThemeClasses.customColorValueField}>
          <div className={customThemeClasses.brdrInput}>
            <input
              type="text"
              id={`${str}${outerIndex}${index}RPalatte${placeValue}`}
              value={R}
              onChange={(e: any) => setR(e.target.value as number)}
            />
            <input
              type="text"
              id={`${str}${outerIndex}${index}GPalatte${placeValue}`}
              value={G}
              onChange={(e: any) => setG(e.target.value as number)}
            />
            <input
              type="text"
              id={`${str}${outerIndex}${index}BPalatte${placeValue}`}
              value={B}
              onChange={(e: any) => setB(e.target.value as number)}
            />
          </div>
          <div className={customThemeClasses.singleInputValue}>
            <input
              type="text"
              id={`${str}${outerIndex}${index}APalatte${placeValue}`}
              value={A}
              onChange={(e: any) => setA(e.target.value as number)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorPalette;
