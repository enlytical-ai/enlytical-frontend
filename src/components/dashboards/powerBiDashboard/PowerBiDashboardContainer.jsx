
import "./PowerBiDashboardContainer.css";
import { PowerBIEmbed } from 'powerbi-client-react';
import Loader from "../../commonComponent/Loader/Loader";
import { models } from "powerbi-client"
import { useEffect, useState } from 'react';
import axios from "axios";
const PowerBiDashboardContainer = (props) => {
    const { currentDashboard } = props;
    const [error, setError] = useState(null);
    const [state, setState] = useState();
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        const token = localStorage.getItem("token");
        setLoading(true)
        setState(null);
        axios.get(`http://localhost:5000/powerBi/getEmbedInfo/${currentDashboard}`, {
            headers: {
                token
            }
        }).then(function (response) {
            setState(response.data.data);
            setLoading(false);
        }).catch(function (error) {

        });
    }, [currentDashboard])
    return (
        <div className="dailyPerformanceDashboardContainer" >
            {
                state && (<PowerBIEmbed
                    embedConfig={{
                        type: 'report',   // Supported types: report, dashboard, tile, visual and qna
                        id: state.embedUrl[0].reportId,
                        embedUrl: state.embedUrl[0].embedUrl,
                        accessToken: state.accessToken,
                        tokenType: models.TokenType.Embed,
                        settings: {
                            panes: {
                                filters: {
                                    expanded: false,
                                    visible: false
                                }
                            },
                            background: models.BackgroundType.Transparent,
                        }
                    }}

                    eventHandlers={
                        new Map([
                            ['loaded', function () { console.log('Report loaded'); }],
                            ['rendered', function () { console.log('Report rendered'); }],
                            ['error', function (event) { console.log(event.detail); }]
                        ])
                    }

                    cssClassName={"Embed-container"}

                    getEmbeddedComponent={(embeddedReport) => {
                        window.report = embeddedReport;
                    }}
                />)
            }
            {
                loading && <Loader />
            }
        </div>
    )
}
export default PowerBiDashboardContainer