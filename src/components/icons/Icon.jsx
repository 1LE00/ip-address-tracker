function Icon(props) {

    return (
        <img src={props.src} id={props.id} alt={props.alt} title={props.title} onClick={props.onClick} data-key={props.keys} />
    )
}

export default Icon;