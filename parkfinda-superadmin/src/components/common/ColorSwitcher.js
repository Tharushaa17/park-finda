import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  themeColorStorageKey,
  themeRadiusStorageKey
} from '../../constants/defaultValues';
class ColorSwitcher extends Component {
  constructor(props) {
    super();

    this.state = {
      isOpen: false,
      selectedColor: localStorage.getItem(themeColorStorageKey),
      radius: localStorage.getItem(themeRadiusStorageKey) || 'rounded'
    };
    this.removeEvents();
  }

  getContainer = () => {
    return ReactDOM.findDOMNode(this);
  };

  toggle = e => {
    e.preventDefault();
    const isOpen = this.state.isOpen;
    if (!isOpen) {
      this.addEvents();
    } else {
      this.removeEvents();
    }
    this.setState({
      isOpen: !isOpen
    });
  };
  changeThemeColor = (e, color) => {
    e.preventDefault();
    localStorage.setItem(themeColorStorageKey, color);
    this.toggle(e);
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  componentDidMount() {
    this.changeRadius(this.state.radius);
  }

  addEvents = () => {
    ['click', 'touchstart'].forEach(event =>
      document.addEventListener(event, this.handleDocumentClick, true)
    );
  };
  removeEvents = () => {
    ['click', 'touchstart'].forEach(event =>
      document.removeEventListener(event, this.handleDocumentClick, true)
    );
  };

  handleDocumentClick = e => {
    const container = this.getContainer();
    if (container.contains(e.target) || container === e.target) {
      return;
    }
    this.toggle(e);
  };
  changeRadius = radius => {
    if (radius === 'flat') {
      document.body.classList.remove('rounded');
    } else {
      document.body.classList.add('rounded');
    }
    this.setState({
      radius
    });
    localStorage.setItem(themeRadiusStorageKey, radius);
  };

  render() {
    return (
      <div></div>
        
    );
  }
}

export default ColorSwitcher;
