
import { BASE_URL } from "../../../appConstants";
import axios from "axios";
const getDynamicData = async (obj) => {
    const token = localStorage.getItem("token");
    const response = await axios.post(`${BASE_URL}dashboard/advertisingReport/getDynamicTableData?brandId=${obj.current_brand_id}`, {
        time_range_one: {
            "start_time": "2022-11-10T00:00:00.000+00:00",
            "end_time": "2022-11-11T00:00:00.000+00:00"
        },
        time_range_two: {
            "start_time": "2022-11-11T00:00:00.000+00:00",
            "end_time": "2022-11-12T00:00:00.000+00:00"
        },
        group_by: obj.group_by,
        filter: obj.filter,
        campaign_type_array: obj.campaign_type_array,
        category_array: [

        ]
    }, {
        headers: {
            token
        }
    })
    // }).then(function (response) {
    //     const { dynamic_table_data } = response.data.data;
    //     res = dynamic_table_data;
    // }).catch(function (error) {
    //     console.log(error)
    // });
    return response.data.data.dynamic_table_data;
}


export default getDynamicData;


