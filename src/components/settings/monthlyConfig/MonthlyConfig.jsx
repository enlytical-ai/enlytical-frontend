import { useState, useEffect } from "react"
import axios from "axios"
import "./MonthlyConfig.css"
import ProductTable from "./ProductTable"
import BudgetContainer from "./BudgetContainer"
import ProgressBar from "../../commonComponent/ProgressBar"
import SellerTable from "./SellerTable"
const MonthlyConfig = () => {
    const [state, setState] = useState({
        page: 1,
        maxPage: 3,
        product_data_array: [],
        seller_arrary: [],
        category_wise_sales_and_spend_target: []
    });
    useEffect(() => {
    

    }, [])

    const changePage = (action) => {
        const { page, maxPage } = state;

        if (action === "next") {
            if (page === maxPage) {
                return;
            }
            setState(prevState => ({ ...prevState, page: prevState.page + 1 }));
        } else if (action === "previous") {
            if (page === 1) {
                return;
            }
            setState(prevState => ({ ...prevState, page: prevState.page - 1 }));
        }

    }
    return (
        <div className="monthlyConfig" >
            <div className="monthlyConfigSlides" >

                {
                    state.page === 1 ? <ProductTable product_data_array={state.product_data_array} /> : state.page === 2 ? <SellerTable /> : state.page === 3 ? <BudgetContainer category_wise_sales_and_spend_target={state.category_wise_sales_and_spend_target} /> : null
                }
            </div>
            <div>
                <ProgressBar page={state.page} maxPage={state.maxPage} />
            </div>
            <div className="monthlyConfigSliderButtonsContainer" >
                <div className="monthlyConfigSliderButtons" style={{ display: "flex" }} >
                    <button style={{ marginRight: "20px" }} onClick={() => changePage("previous")} type="button" className="btn btn-secondary btn-sm">Previous</button>
                </div>
                <div className="monthlyConfigSliderButtons" style={{ display: "flex" }} >
                    <button onClick={() => changePage("next")} type="button" className="btn btn-primary btn-sm">Next</button>
                </div>
            </div>
        </div>
    )
}

export default MonthlyConfig