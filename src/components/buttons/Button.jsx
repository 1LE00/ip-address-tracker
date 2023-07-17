import Icon from "../icons/Icon";

function Button(props) {
    return (
        <button className={props.className && `${props.className}`} onClick={props.handleButtonClick}>
            <Icon src={props.src} id={props.id} alt={props.alt} title={props.title} />
        </button>
    )
}

export default Button;