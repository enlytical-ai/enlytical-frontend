import "./SellerAndBudgetContainer.css";
import SellerTable from "./SellerTable";
const SellerAndBudgetContainer = (props) => {
    const { seller_arrary } = props
    return (
        <div style={{ display: "flex", flexDirection: "row" }} >
            <div style={{ width: "content-fit" }}  >
                <SellerTable seller_arrary={seller_arrary} />
            </div>
            <div style={{ width: "400px", flex: 1, marginTop: "0px", marginLeft: "20px" }} >
                <h3 style={{ fontSize: "18px", color: "#1565C0" }} >Please select you Sellers</h3>
                <div style={{ border: "1px solid  #bdbdbd", height: "500px", paddingLeft: "20px", paddingRight: "20px", borderRadius: "5px", backgroundColor: "white" }} >
                    <form >
                        <div class="form-group">
                            <label for="inputBudget">Input Budget</label>
                            <input type="number" class="form-control" id="inputBudget" placeholder="Input Budget"></input>
                        </div>
                        <div class="form-group">
                            <label for="monthlyBudget">Monthly Budget</label>
                            <input type="number" class="form-control" id="monthlyBudget" placeholder="Monthly Budget"></input>
                        </div>
                        <div class="form-group">
                            <label for="targetAcos">Target ACOS</label>
                            <input type="number" class="form-control" id="targetAcos" placeholder="Target ACOS"></input>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SellerAndBudgetContainer;