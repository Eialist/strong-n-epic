import React from "react";

type PopUpProps = {
  onOkClick: () => void;
  onCancelClick: () => void;
  insertText: string | JSX.Element;
};

const PopUpComponent: React.FC<PopUpProps> = ({
  onOkClick,
  onCancelClick,
  insertText,
}) => {
  return (
    <div className="modal" style={{ display: "block" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-body">
            <div>{insertText}</div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => onCancelClick()}>
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => onOkClick()}>
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopUpComponent;
