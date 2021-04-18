import { Grid, Paper } from "@material-ui/core";
import React, { useEffect } from "react";

import Container from "@material-ui/core/Container";
import ContextMenu from "../components/CustomizedMenus";
import CustomizedMenus from "../components/CustomizedMenus";
import SlideShow from "../components/SlideShow/SlideShow";

import image1 from "../assets/1.jpg";
import image2 from "../assets/2.jpg";
import image3 from "../assets/3.jpg";
import image4 from "../assets/4.jpg";
import image5 from "../assets/5.jpg";
import image6 from "../assets/6.jpg";
import image7 from "../assets/7.jpg";
import image8 from "../assets/8.jpg";
import { Redirect, useHistory } from "react-router-dom";
import { getlocalStorage, getlUrlPaths, SIGNED_IN_USER } from "../utils";

const Images = [image1, image2, image3, image4, image5, image6, image7, image8];

export default function Desktop() {
  const signed_in_user = getlocalStorage(SIGNED_IN_USER);
  const paths = getlUrlPaths();

  if (!signed_in_user) {
    return <Redirect to="/SignUp" />;
  } else if (!paths.includes("app")) {
    return <Redirect to="/app" />;
  }

  return (
    <Grid
      container
      direction="column"
      style={{ height: "100%", width: "100%" }}
    >
      {/* <SlideShow
        autoPlay={true}
        activeSlideDuration={10 * 1000}
        interactionMode="swipe"
        alignCaption="center"
        alignIndicators="center"
        indicatorsColor="#fff"
        useRightLeftTriangles={true}
        rightTriangleColor="#fff"
        leftTriangleColor="#fff"
        rightIcon={
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">
            <path d="M24.707 38.101L4.908 57.899c-4.686 4.686-4.686 12.284 0 16.971L185.607 256 4.908 437.13c-4.686 4.686-4.686 12.284 0 16.971L24.707 473.9c4.686 4.686 12.284 4.686 16.971 0l209.414-209.414c4.686-4.686 4.686-12.284 0-16.971L41.678 38.101c-4.687-4.687-12.285-4.687-16.971 0z" />
          </svg>
        }
        leftIcon={
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">
            <path d="M231.293 473.899l19.799-19.799c4.686-4.686 4.686-12.284 0-16.971L70.393 256 251.092 74.87c4.686-4.686 4.686-12.284 0-16.971L231.293 38.1c-4.686-4.686-12.284-4.686-16.971 0L4.908 247.515c-4.686 4.686-4.686 12.284 0 16.971L214.322 473.9c4.687 4.686 12.285 4.686 16.971-.001z" />
          </svg>
        }
      >
        {Images.map((e) => (
          <div>
            <img src={e} />
          </div>
        ))}
      </SlideShow>
      */}

      <CustomizedMenus />
    </Grid>
  );
}
