import React from "react";
import "../Style/InfoBox.css";
import { Card, CardContent, Typography } from "@material-ui/core";

export const InfoBox = ({ title, cases, total }) => {
  return (
    <Card className="infoBox">
      <CardContent>
        <Typography className="infoBox_title" color="textSecondary">
          {title}
        </Typography>
        <h2 className="infoBox_cases">{cases}</h2>

        <Typography className="infoBox_total" color="textSecondary">
          {total} Total To Date
        </Typography>
      </CardContent>
    </Card>
  );
};