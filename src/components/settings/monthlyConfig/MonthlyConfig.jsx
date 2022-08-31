import { useState, useEffect } from "react"
import axios from "axios"
import "./MonthlyConfig.css"
import ProductTable from "./ProductTable"
import SellerAndBudgetContainer from "./SellerAndBudgetContainer"
import ProgressBar from "../../commonComponent/ProgressBar"
const MonthlyConfig = () => {
    const [state, setState] = useState({
        page: 1,
        maxPage: 2,
        crawled_data_array: [],
        seller_arrary: []
    });
    useEffect(() => {
        axios.get('http://localhost:5000/onbordingCrawledData')
            .then(function (response) {
                console.log(response.data.data);
                const { crawled_data_array, seller_arrary } = response.data.data
                setState((prevState) => ({ ...prevState, crawled_data_array, seller_arrary }))
            })
            .catch(function (error) {
                console.log(error);
            });
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
                    state.page === 1 ? <ProductTable crawled_data_array={state.crawled_data_array} /> : state.page === 2 ? <SellerAndBudgetContainer seller_arrary={state.seller_arrary} /> : null
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