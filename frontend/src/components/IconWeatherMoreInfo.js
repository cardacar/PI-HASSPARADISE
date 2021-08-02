import React, { Fragment } from "react";
import { Typography, Icon } from "@material-ui/core";

const IconWeatherMoreInfo = (props) => {
    const {dataWeather, iconWeather, clasStyle, textdescweather, textdescunity} = props
  return (
    <Fragment>
      <div className={clasStyle}>
        <Icon fontSize="large">
            {iconWeather}
        </Icon>
      </div>
      <div>
        <Typography
          className={"MuiTypography--heading"}
          variant={"body1"}
          gutterBottom
        >
          {textdescweather}
        </Typography>
        <Typography
          className={"MuiTypography--heading"}
          variant={"body1"}
          gutterBottom
        >
          {dataWeather} {textdescunity}
        </Typography>
      </div>
    </Fragment>
  );
};

export default IconWeatherMoreInfo;
