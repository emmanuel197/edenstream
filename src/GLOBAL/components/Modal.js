import "../components/styles/modal.scss"

const Modal = ({ children, title, onClose, showCloseBtn = true, show }) => {
    if (!show) return <></>
    return (
        <>
            <section className='modal-wrapper'>
                <div className='modal-content'>
                    <h2>{title}</h2>
                    {showCloseBtn ? <span onClick={onClose}>&times;</span> : <></>}
                    {children}
                </div>
            </section>
        </>
    )
}

export default Modal