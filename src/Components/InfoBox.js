// import React from "react";
// import "../Style/InfoBox.css";
// import { Card, CardContent, Typography } from "@material-ui/core";

// export const InfoBox = ({ title, active, cases, total, isRed, ...props }) => {
//   return (
//     <Card
//       className={`infoBox ${active && "infoBox--selected"} ${
//         isRed && "infoBox--red"
//       }`}
//       onClick={props.onClick}
//     >
//       <CardContent>
//         <Typography className="infoBox_title" color="textSecondary">
//           {title}
//         </Typography>
//         <h2 className={`infoBox__cases ${!isRed && "infoBox__cases--green"}`}>{cases}</h2>

//         <Typography className="infoBox_total" color="textSecondary">
//           {total} Total To Date
//         </Typography>
//       </CardContent>
//     </Card>
//   );
// };

import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import "../Style/InfoBox.css";

export const InfoBox = ({ title, cases, total, active, isRed, ...props })  => {
  // console.log(title, active);
  return (
    <Card
      onClick={props.onClick}
      className={`infoBox ${active && "infoBox--selected"} ${
        isRed && "infoBox--red"
      }`}
    >
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
         <strong>{title}</strong> 
        </Typography>
        <h2 className={`infoBox__cases ${!isRed && "infoBox__cases--green"}`}>
        <strong>{cases}</strong> 
        </h2>

        <Typography className="infoBox__total" color="textSecondary">
          {total} Total
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox