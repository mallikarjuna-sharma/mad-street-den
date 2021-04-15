import React from "react";
import Radium from "radium";
import "./Slideshow.css";
class SlideShow extends React.Component {
  state = {
    activeIndex: 0,
    nextActiveIndex: 0,
    activeIndexClasses: ["active-slide"],
    nextActiveIndexClasses: [],
    disablePrevNext: false,
    xCoordinate: null,
  };
  // used to detect slider direction when clicking the buttons to change slides
  direction = "to-left";
  // how long a slide will be displayed
  slideTimeOut = this.props.activeSlideDuration
    ? this.props.activeSlideDuration
    : 3000;
  /*will be used to reset classes after animating the transition from a slide to another
        (it has to be equal to the animation duration in the css
        classes [enter-to-left, exit-to-left, enter-to-right, exit-to-right])*/
  animationDuration = 600;
  // will be used to auto play the carousel
  autoSlide;
  // will be used to set the interaction mode (swipe or hover)
  interactionMode = this.props.interactionMode
    ? this.props.interactionMode
    : "swipe";

  componentDidMount() {
    this.startAutoSliding();
  }

  componentWillUnmount() {
    this.stopAutoSliding();
  }

  // used to unify the touch and click cases
  unify = (e) => (e.changedTouches ? e.changedTouches[0] : e);

  // get and set the x coordinate
  getSetXCoordinate = (e) =>
    this.setState({ xCoordinate: this.unify(e).clientX });

  // move the slide based on the swipe direction
  moveSlide = (e) => {
    const { xCoordinate } = this.state;
    if (xCoordinate || xCoordinate === 0) {
      let dx = this.unify(e).clientX - xCoordinate,
        s = Math.sign(dx);
      if (s < 0) {
        this.nextSlide();
      } else if (s > 0) {
        this.prevSlide();
      }
    }
  };

  // show the next slide in the view port based on the direction
  animateSliding = () => {
    let activeIndexClasses = [];
    let nextActiveIndexClasses = [];

    // attach the following classes if the user click the next button
    if (this.direction === "to-left") {
      activeIndexClasses.push("active-slide", "exit-to-left");
      nextActiveIndexClasses.push(
        "active-slide",
        "next-active-slide",
        "enter-to-left"
      );
    } else {
      // attach the following classes if the user click the prev button
      activeIndexClasses.push("active-slide", "exit-to-right");
      nextActiveIndexClasses.push(
        "active-slide",
        "next-active-slide",
        "enter-to-right"
      );
    }

    this.setState({
      activeIndexClasses: activeIndexClasses,
      nextActiveIndexClasses: nextActiveIndexClasses,
    });
  };

  // start auto sliding
  startAutoSliding = () => {
    const { autoPlay } = this.props;

    this.autoSlide = autoPlay
      ? setInterval(this.nextSlide, this.slideTimeOut)
      : null;
  };

  // stop auto sliding
  stopAutoSliding = () => {
    clearInterval(this.autoSlide);
  };

  // used to restart auto sliding when user click prev, next button or on the carousel indicator
  restartAutoSliding = (nextAcIn) => {
    this.setState({
      nextActiveIndex: nextAcIn,
      disablePrevNext: true,
    });

    // attach the required classes to animate the transition between slides
    this.animateSliding();

    // reset classes and enable prev & next btns after the animation duration
    this.setActiveSlide(nextAcIn);

    // restart auto sliding
    this.startAutoSliding();
  };

  // reset classes after the animation duration and enable prev & next btns
  setActiveSlide = (nextActiveI) => {
    setTimeout(() => {
      this.setState({
        activeIndex: nextActiveI,
        activeIndexClasses: ["active-slide"],
        nextActiveIndexClasses: [],
        disablePrevNext: false,
      });
    }, this.animationDuration);
  };

  nextSlide = () => {
    const { activeIndex } = this.state;
    const { children } = this.props;

    //stop auto sliding (so that when user click the next button we can reset the timer for auto sliding)
    this.stopAutoSliding();

    // set direction to left because slide is coming from the right side to the view port
    this.direction = "to-left";

    // set the next active index
    let nextActiveI = activeIndex + 1;

    // if the we reach the last slide reset the next active index to 0
    if (nextActiveI === children.length) {
      nextActiveI = 0;
    }

    // restart auto sliding
    this.restartAutoSliding(nextActiveI);
  };

  prevSlide = () => {
    const { activeIndex } = this.state;
    const { children } = this.props;

    //stop auto sliding (so that when user click the prev button we can reset the timer for auto sliding)
    this.stopAutoSliding();

    // set direction to right because slide is coming from the left side to the view port
    this.direction = "to-right";

    // set the next active index
    let nextActiveI = activeIndex - 1;

    // if we are at the first slide set the next active index to the last slide
    if (nextActiveI < 0) {
      nextActiveI = children.length - 1;
    }

    // restart auto sliding
    this.restartAutoSliding(nextActiveI);
  };

  onCarouselIndecator = (index) => {
    const { activeIndex } = this.state;

    //stop auto sliding
    this.stopAutoSliding();

    // set the next active index
    let nextActiveI = index;

    // set the direction of the carousel based on the clicked indicator index
    if (nextActiveI < activeIndex) {
      this.direction = "to-right";
    } else {
      this.direction = "to-left";
    }

    // restart auto sliding
    this.restartAutoSliding(nextActiveI);
  };

  render() {
    const {
      activeIndex,
      nextActiveIndex,
      activeIndexClasses,
      nextActiveIndexClasses,
      disablePrevNext,
    } = this.state;

    const {
      alignIndicators,
      alignCaption,
      useRightLeftTriangles,
      leftTriangleColor,
      leftIcon,
      rightTriangleColor,
      rightIcon,
      indicatorsColor,
      interactionMode,
      children,
    } = this.props;

    // use it to set the indicator position based on the coming props
    let indicatorPosition = "position-center";

    if (alignIndicators === "right") {
      indicatorPosition = "position-right";
    } else if (alignIndicators === "left") {
      indicatorPosition = "position-left";
    }

    return (
      <div
        className="carousel-slider-wrapper"
        style={{
          cursor: interactionMode === "swipe" ? "pointer" : "",
        }}
        onMouseDown={(e) => {
          if (this.interactionMode !== "swipe") {
            return;
          }
          this.getSetXCoordinate(e);
        }}
        onTouchStart={(e) => {
          if (this.interactionMode !== "swipe") {
            return;
          }
          this.getSetXCoordinate(e);
        }}
        onMouseUp={(e) => {
          if (disablePrevNext || this.interactionMode !== "swipe") {
            return;
          }
          this.moveSlide(e);
        }}
        onTouchEnd={(e) => {
          if (disablePrevNext || this.interactionMode !== "swipe") {
            return;
          }
          this.moveSlide(e);
        }}
        onMouseMove={(e) => {
          if (this.interactionMode !== "swipe") {
            return;
          }
          e.preventDefault();
        }}
        onTouchMove={(e) => {
          if (this.interactionMode !== "swipe") {
            return;
          }
          e.preventDefault();
        }}
      >
        {children.map((el, i) => {
          let classes = "";

          if (i === activeIndex) {
            classes = activeIndexClasses.join(" ");
          } else if (i === nextActiveIndex) {
            classes = nextActiveIndexClasses.join(" ");
          }

          const swipeClass = interactionMode === "swipe" ? "swipe" : "";

          return (
            <div
              key={i}
              className={`carousel-slide ${classes} ${swipeClass}`}
              style={{ textAlign: alignCaption }}
              // the following events to pause the auto slide on hover
              onMouseEnter={() => {
                if (this.interactionMode !== "hover") {
                  return;
                }
                this.stopAutoSliding();
              }}
              onMouseLeave={() => {
                if (this.interactionMode !== "hover") {
                  return;
                }
                this.startAutoSliding();
              }}
            >
              {el.props.children}
            </div>
          );
        })}

        <ol className={`carousel-indicators ${indicatorPosition}`}>
          {children.map((el, i) => (
            <li
              key={i}
              className={i === nextActiveIndex ? "active" : ""}
              style={
                indicatorsColor
                  ? {
                      borderColor: indicatorsColor,
                      backgroundColor:
                        i === nextActiveIndex ? indicatorsColor : "",
                      ":hover": {
                        backgroundColor: indicatorsColor,
                        opacity: i === nextActiveIndex ? 1 : 0.7,
                      },
                    }
                  : {}
              }
              onClick={() => {
                if (children && children.length !== 1) {
                  this.onCarouselIndecator(i);
                }
              }}
            />
          ))}
        </ol>
      </div>
    );
  }
}

SlideShow = Radium(SlideShow);

export default SlideShow;
