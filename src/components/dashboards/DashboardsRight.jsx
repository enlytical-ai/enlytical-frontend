import "./DashboardsRight.css"
const DashboardsRight = (props) => {
    return (
        <>
            <div
                className="sidebas-arrow"
                style={{ fontSize: 22, position: "relative" }}
                onClick={() => props.setSidebarToggle(prevState => !prevState)}
            >
                <i class={`bi bi-chevron-compact-${props.sidebarToggle ? "left" : "right"}`}></i>
            </div>
            <div className="dashboardsRight" id="dashboardsRight" >
                {props.children}
            </div>
        </>
    )
}

export default DashboardsRight;