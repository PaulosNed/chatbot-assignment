import * as React from "react";
import { SVGProps } from "react";
const TrashIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <rect width="48" height="48" fill="url(#pattern0_5599_371)" />
    <defs>
      <pattern
        id="pattern0_5599_371"
        patternContentUnits="objectBoundingBox"
        width="1"
        height="1"
      >
        <use xlinkHref="#image0_5599_371" transform="scale(0.000925926)" />
      </pattern>
      <image
        id="image0_5599_371"
        width="1080"
        height="1080"
      />
    </defs>
  </svg>
);
export default TrashIcon;