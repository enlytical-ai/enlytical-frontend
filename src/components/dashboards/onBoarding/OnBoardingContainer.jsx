import BudgetContainer from "../../settings/monthlyConfig/BudgetContainer";
import ProductTable from "../../settings/monthlyConfig/ProductTable";
import SellerTable from "../../settings/monthlyConfig/SellerTable";

const OnBoardingContainer = (props) => {
    const { currentOnBoardingEl } = props;
    return (
        <>
            {currentOnBoardingEl === "Portfolio" && <ProductTable />}
            {currentOnBoardingEl === "Seller" && <SellerTable />}
            {currentOnBoardingEl === "Budget" && <BudgetContainer />}
        </>

    )
}

export default OnBoardingContainer;