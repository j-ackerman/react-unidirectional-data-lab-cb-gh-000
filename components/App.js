// eslint-disable-next-line
'use strict'

import React from 'react';
import Sidebar from './Sidebar';
import FileView from './FileView';

import fileStore from '../stores/fileStore';
import actions from '../actions';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: fileStore.getState(),
      selectedFileIndex: 0,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  componentDidMount() {
    this.removeListener = fileStore.addListener(files => {
      this.setState({ files });
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  handleChange(ev) {
    const { selectedFileIndex } = this.state;
    actions.updateFile(selectedFileIndex, ev.target.value);
  }

  handleSelect(selectedFileIndex) {
    this.setState({ selectedFileIndex });
  }

  handleAdd(ev) {
    ev.preventDefault();
    actions.addFile();
  }

  handleRemove(ev) {
    ev.preventDefault()
    const confirmDeletion = confirm("Are you sure you want to delete this page?");
    if(confirmDeletion === true){
        const confirmDeletionAgain = confirm("Press okay to delete page.");
        (confirmDeletionAgain === true) ? actions.removeFile(this.state.selectedFileIndex) : alert("Item not deleted.");
    } else {
      alert("Item not deleted.");
    }
    this.setState({ selectedFileIndex: this.state.selectedFileIndex - 1 })
  }

  render() {
    const { files, selectedFileIndex } = this.state;
    const file = files[selectedFileIndex];

    return (
      <div className="app">
        <Sidebar
          files={files}
          selectedFileIndex={selectedFileIndex}
          onSelect={this.handleSelect}
        />
        <FileView
          file={file}
          onChange={this.handleChange}
          onAdd={this.handleAdd}
          onRemove={this.handleRemove}
        />
      </div>
    );
  }
}
