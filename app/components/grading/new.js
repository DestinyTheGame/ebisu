export function New({ onClose, onComplete }) {
  return (
    <div className="modal active" id="modal-id">
      <a href="#close" className="modal-overlay" aria-label="Close" onClick={ onClose }></a>
      <div className="modal-container">
        <div className="modal-header">
          <a href="#close" className="btn btn-clear float-right" aria-label="Close" onClick={ onClose }></a>
          <div className="modal-title h5">Modal title</div>
        </div>
        <div className="modal-body">
          <div class="content">
            Content
          </div>
        </div>
        <div className="modal-footer">
          Footer
        </div>
      </div>
    </div>
  )
}
