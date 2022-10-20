import BudgetContainer from "../../settings/monthlyConfig/BudgetContainer";
import ProductTable from "../../settings/monthlyConfig/ProductTable";
import SellerTable from "../../settings/monthlyConfig/SellerTable";

const OnBoardingContainer = (props) => {
    const { currentOnBoardingEl, changeOnBoardingEl } = props;
    return (
        <>
            <div>
                {currentOnBoardingEl === "Portfolio" && <ProductTable changeOnBoardingEl={changeOnBoardingEl} />}
                {currentOnBoardingEl === "Seller" && <SellerTable changeOnBoardingEl={changeOnBoardingEl} />}
                {currentOnBoardingEl === "Budget" && <BudgetContainer changeOnBoardingEl={changeOnBoardingEl} />}
            </div>
        </>

    )
}

export default OnBoardingContainer;