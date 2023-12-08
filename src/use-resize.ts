import { useEffect, useState } from "react"


export function useResize() {
  const [size, setSize] = useState<[number, number]>([window.innerWidth, window.innerHeight]);
  useEffect(() => {
    function update() {
      setSize([window.innerWidth, window.innerHeight])
    }
    
    update()

    window.addEventListener("resize", update);

    return () => window.removeEventListener("resize", update);
  }, []);

  return size;
};

// export function adjustToRatio(width: number, height: number, requestedRatio: [w: number, h: number]) {
//   const [ratioWidth, ratioHeight] = requestedRatio

//   if ((width / height) < ratioWidth / ratioHeight ) {
//     return [
//       Math.floor(width / ratioWidth) * ratioWidth,
//       Math.floor(width / ratioWidth) * ratioHeight
//     ]
//   } else {
//     return [
//       Math.floor(height / ratioHeight) * ratioHeight,
//       Math.floor(height / ratioHeight) * ratioWidth
//     ]
//   }
// }
