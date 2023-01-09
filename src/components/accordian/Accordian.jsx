import { useState } from "react";
import { useEffect } from "react";
import "./Accordian.css";
const Accordian = (props) => {
  const {
    accordianStatus,
    accordianBodyHeight,
    accordianHeaderHeight,
    openingAanimationDuration,
    closingAanimationDuration,
    accordianBorderRadius,
    accordianBorderColour,
    accordianHeaderBackgroundColor,
    accordianHoverHeaderBackgroundColor,
    accordianBodyBackgroundColor,
    accordianHeaderText,
  } = props;
  const [state, setState] = useState({
    toggle: null,
    uiToggle: false,
    headerClass: "abysp_accordian_header_close",
    bodyClass: "abysp_accordian_body",
  });
  useEffect(() => {
    let rootEl = document.querySelector(":root");
    if (accordianBodyHeight)
      rootEl.style.setProperty(
        "--abysp_accordian_body_heigh",
        `${accordianBodyHeight - 1}px`
      );
    if (openingAanimationDuration)
      rootEl.style.setProperty(
        "--abysp_opening_animation_duration",
        `${openingAanimationDuration}s`
      );
    if (closingAanimationDuration)
      rootEl.style.setProperty(
        "--abysp_closing_animation_duration",
        `${closingAanimationDuration}s`
      );
    if (accordianBorderRadius)
      rootEl.style.setProperty(
        "--abysp_accordian_border_radius",
        `${accordianBorderRadius}px`
      );
    if (accordianBorderColour)
      rootEl.style.setProperty(
        "--abysp_accordian_border_colour",
        accordianBorderColour
      );
    if (accordianHeaderBackgroundColor)
      rootEl.style.setProperty(
        "--abysp_accordian_header_background_color",
        accordianHeaderBackgroundColor
      );
    if (accordianHoverHeaderBackgroundColor)
      rootEl.style.setProperty(
        "--abysp_accordian_hover_header_background_color",
        accordianHoverHeaderBackgroundColor
      );
    if (accordianBodyBackgroundColor)
      rootEl.style.setProperty(
        "--abysp_accordian_body_background_color",
        accordianBodyBackgroundColor
      );
    if (accordianStatus) {
      setState({
        toggle: true,
        uiToggle: true,
        headerClass: "abysp_accordian_header_open",
        bodyClass: "abysp_accordian_body_default_open",
      });
    }
  }, [
    accordianStatus,
    accordianBodyHeight,
    accordianHeaderHeight,
    openingAanimationDuration,
    closingAanimationDuration,
    accordianBorderRadius,
    accordianBorderColour,
    accordianHeaderBackgroundColor,
    accordianHoverHeaderBackgroundColor,
    accordianBodyBackgroundColor,
    accordianHeaderText,
  ]);

  const accordianToggle = () => {
    if (toggle === null) {
      setState({
        toggle: true,
        uiToggle: true,
        headerClass: "abysp_accordian_header_open",
        bodyClass: "abysp_accordian_body_open",
      });
    } else if (toggle === true) {
      setState((prevState) => ({
        ...prevState,
        toggle: false,
        headerClass: "abysp_accordian_header_close",
        bodyClass: "abysp_accordian_body_close",
      }));
      setTimeout(
        () => {
          setState((prevState) => ({
            ...prevState,
            uiToggle: false,
          }));
        },
        closingAanimationDuration ? closingAanimationDuration * 1000 : 400
      );
    } else if (toggle === false) {
      setState({
        toggle: true,
        uiToggle: true,
        headerClass: "abysp_accordian_header_open",
        bodyClass: "abysp_accordian_body_open",
      });
    }
  };
  const { toggle, uiToggle, headerClass, bodyClass } = state;
  return (
    <div className="abysp_accordian_ontainer">
      <div
        id="abysp_accordian_header"
        style={{
          height: accordianHeaderHeight ? accordianHeaderHeight - 2 : 28,
        }}
        className={headerClass}
      >
        <div className="abysp_accordian_header_icon" onClick={accordianToggle}>
          {toggle ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-chevron-up"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-chevron-down"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
              />
            </svg>
          )}
        </div>
        <div style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
          {props.accordianHeaderComponent ? (
            <props.accordianHeaderComponent />
          ) : (
            <div>{accordianHeaderText ? accordianHeaderText : ""}</div>
          )}
        </div>
      </div>
      {uiToggle && (
        <div id="abysp_accordian_body_constants" className={bodyClass}>
          {props.accordianBodyComponent && <props.accordianBodyComponent />}
        </div>
      )}
    </div>
  );
};

export default Accordian;
