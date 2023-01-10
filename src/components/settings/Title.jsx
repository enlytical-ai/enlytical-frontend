const Title = ({ children, style }) => {
    return (
        <div style={{

            height: 32,
            display: "flex",
            alignItems: "center",
        }} className="sellerTableHeader" >
            <h3 style={{ ...style, fontSize: "18px", color: "#1565C0" }} >{children}</h3>
        </div >
    )
}

export default Title;