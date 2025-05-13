
import "../components/styles/generic-modal.scss"
const GenericModal = ({sectionClassName,
   buttons, 
   img, 
   imgClassName, 
   svg,
   modalTextClassName, 
   headerText, 
   paragraphText, 
   ContentWrapper,
   children
  }) => {
    return (
        <section className={`generic-modal-section ${sectionClassName}`}>
            <div className={`modal-content-wrapper ${ContentWrapper}`}>
                {img && <img loading="lazy" src={img} className={`modal-content-img ${imgClassName}`}/>}
                {svg && svg}
                <div className="modal-content-text">
                {headerText && <h2 className="modal-content-header">{headerText}</h2>}
          {paragraphText && <p className="modal-content-paragraph">{paragraphText}</p>}
                </div>
                {children}
                {buttons && buttons.length > 0 && (
        <div className="modal-buttons-container">
          {buttons.map((button, index) => (
            <div key={index} className="modal-button-wrapper">
              {button}
            </div>
          ))}
        </div>
      )}
            </div>
            
        </section>
    )
}

export default GenericModal