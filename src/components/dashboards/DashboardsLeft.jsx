import "./DashboardsLeft.css"
const DashboardsLeft = (props) => {
    return (
        <div style={{ width: props.width }} className="dashboardsLeft" >
            {props.children}
        </div>
    )
}

export default DashboardsLeft;