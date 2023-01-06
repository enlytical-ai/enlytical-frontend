import "./Content.css";
const Content = (props) => {
    return (
        <div style={props.style} className={props.className} >
            {props.children}
        </div>
    )
}

export default Content;