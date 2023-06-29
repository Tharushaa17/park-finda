import React, { Component } from "react";
import DropzoneComponent from "react-dropzone-component";
import "dropzone/dist/min/dropzone.min.css";
import { storage } from '../../../../helpers/Firebase';

var ReactDOMServer = require('react-dom/server');


var dropzoneComponentConfig = {
  postUrl: 'no-url'
};
var dropzoneConfig = {
  thumbnailHeight: 160,
  maxFilesize: 10,
  maxFiles: 3,
  previewTemplate: ReactDOMServer.renderToStaticMarkup(
    <div className="dz-preview dz-file-preview mb-3">
      <div className="d-flex flex-row ">
        <div className="p-0 w-30 position-relative">
          <div className="dz-error-mark">
            <span>
              <i />{" "}
            </span>
          </div>
          <div className="dz-success-mark">
            <span>
              <i />
            </span>
          </div>
          <div className="preview-container">
            {/*  eslint-disable-next-line jsx-a11y/alt-text */}
            <img data-dz-thumbnail className="img-thumbnail border-0" />
            <i className="simple-icon-doc preview-icon" />
          </div>
        </div>
        <div className="pl-3 pt-2 pr-2 pb-1 w-70 dz-details position-relative">
          <div>
            {" "}
            <span data-dz-name />{" "}
          </div>
          {/* <div className="text-primary text-extra-small" data-dz-size /> */}
          <div className="dz-progress">
            <span className="dz-upload" data-dz-uploadprogress />
          </div>
          <div className="dz-error-message">
            <span data-dz-errormessage />
          </div>
        </div>
      </div>
      <a href="#/" className="remove" data-dz-remove>
        {" "}
        <i className="glyph-icon simple-icon-trash" />{" "}
      </a>
    </div>
  ),
  headers: { "My-Awesome-Header": "header value" },
  autoProcessQueue: false
};

export default class DropzoneExample extends Component {

  state = {
    sendFile: true
  }

  clear() {
    this.myDropzone.removeAllFiles(true);
  }

  addFile = (file) => {
    this.props.setLoading(true);
    setTimeout(() => this.fileUpload(file), 1000);
  }

  fileUpload = (payload) => {
    if (!this.state.sendFile) {
      this.setState({
        sendFile: true
      });
      return;
    }
    try {
      const imageRef = storage.ref().child(`images/${payload.name}`);
      imageRef.put(payload).then((snapshot) => {
        this.props.setLoading(false);
        this.props.upload(payload);
      });
    } catch (error) {
      console.warn(error);
    }
  }

  errorFunc = (event, error) => {
    if (error) {
      this.setState({
        sendFile: false
      })
    }
  }

  // removeFile = (payload) => {
  //   this.props.upload('photos', []);
  // }

  render() {
    return (
      <DropzoneComponent
        config={dropzoneComponentConfig}
        djsConfig={dropzoneConfig}
        eventHandlers={{
          init: (dropzone) => {
            this.myDropzone = dropzone;
          },
          addedfile: this.addFile,
          removedfile: this.props.removeFile,
          error: this.errorFunc,
          sending: this.fileUpload
        }}
      />
    );
  }
}
