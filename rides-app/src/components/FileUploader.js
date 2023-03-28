import React from 'react';
import PropTypes from 'prop-types';

class FileUploader extends React.Component {
  constructor() {
    super();

   this.fileInput = React.createRef();
  }

  handleOnChange = (e) => {
    const {onChange} = this.props;
    const file = e.target.files[0];
    var formData = new FormData();
    formData.append('file', file);
    onChange(formData);
  }

  selectFile = () => {
    this.fileInput.current.click();
  }

  render() {
    const {children} = this.props;

    return (
      <div>
        <input ref={this.fileInput} hidden onChange={this.handleOnChange}  type='file' accept='image/*' capture='camera' />
        {React.cloneElement(this.props.children, { onClick: this.selectFile })}
      </div>
    );
  }
}

FileUploader.propTypes = {
  onChange: PropTypes.func.isRequired
}

export default FileUploader;