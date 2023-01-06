import BudgetContainer from "../../settings/monthlyConfig/BudgetContainer";
import ProductTable from "../../settings/monthlyConfig/ProductTable";
import SellerTable from "../../settings/monthlyConfig/SellerTable";
import { useEffect, useState } from "react";
import "./OnBoardingContainer.css";
import KeywordConfigTable from "../../settings/monthlyConfig/KeywordConfigTable";
import PCvariation from "../../settings/monthlyConfig/PCvariation";
import CompetitionConfirmation from "../../settings/monthlyConfig/CompetitionConfirmation";
const OnBoardingContainer = (props) => {
  //To get the height for grid
  const [containerHeight, setContainerHeight] = useState();
  useEffect(() => {
    const height = window.innerHeight;
    const netHeight = height - (49 + 40);
    setContainerHeight(netHeight);
    //Header48,padding40,24,32,24
    // console.log("====Height===>", el - 168)
  }, []);
  window.addEventListener("resize", () => {
    const height = window.innerHeight;
    const netHeight = height - (49 + 40);
    setContainerHeight(netHeight);
  });
  //

  const { currentOnBoardingEl, changeOnBoardingEl } = props;
  return (
    <div
      className="onBoardingContainer"
      style={{
        display: "flex",
        flexDirection: "column",
        height: containerHeight,
      }}
    >
      {currentOnBoardingEl === "Portfolio" && (
        <ProductTable changeOnBoardingEl={changeOnBoardingEl} />
      )}
      {currentOnBoardingEl === "Seller" && (
        <SellerTable changeOnBoardingEl={changeOnBoardingEl} />
      )}
      {currentOnBoardingEl === "Budget" && (
        <BudgetContainer changeOnBoardingEl={changeOnBoardingEl} />
      )}
      {currentOnBoardingEl === "PriorityKW" && (
        <KeywordConfigTable changeOnBoardingEl={changeOnBoardingEl} />
      )}
      {currentOnBoardingEl === "PC_Variation" && (
        <PCvariation changeOnBoardingEl={changeOnBoardingEl} />
      )}
      {currentOnBoardingEl === "Competition" && (
        <CompetitionConfirmation changeOnBoardingEl={changeOnBoardingEl} />
      )}
    </div>
  );
};

export default OnBoardingContainer;
