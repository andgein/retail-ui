// @flow
/* global React$Element */

import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';

import DropdownContainer from '../DropdownContainer/DropdownContainer';
import Input from '../Input';
import InputLikeText from '../internal/InputLikeText';
import Menu from '../Menu/Menu';
import MenuItem from '../MenuItem';
import RenderLayer from '../RenderLayer';
import Spinner from '../Spinner';

type Props<T> = {
  editing: boolean,
  error: boolean,
  items: T[],
  loading: boolean,
  opened: boolean,
  textValue: string,
  totalCount: number,
  value: T,

  menuRef: (menu: Menu) => void,
  onActivate: () => void,
  onChange: Function,
  onClickOutside: () => void,
  onFocus: () => void,
  onFocusOutside: () => void,
  onInputChange: Function,
  onInputKeyDown: (e: SyntheticKeyboardEvent) => void,
  renderItem: (item: T) => string | React$Element<*>,
  renderNotFound: () => string | React$Element<*>,
  renderTotalCount: (found: number, total: number) => string | React$Element<*>,
  renderValue: (item: T) => string | React$Element<*>
};

class View extends Component {
  static defaultProps = {
    renderItem: x => x,
    renderValue: x => x
  };

  props: Props<*>;

  render() {
    const { onClickOutside, onFocusOutside } = this.props;
    const input = this.renderInput();
    const menu = this.renderMenu();

    return (
      <RenderLayer
        onClickOutside={onClickOutside}
        onFocusOutside={onFocusOutside}
      >
        <label>
          {input}
          <DropdownContainer getParent={findDOMNode(this)} offsetY={1}>
            {menu}
          </DropdownContainer>
        </label>
      </RenderLayer>
    );
  }

  renderMenu() {
    const {
      opened,
      items,
      totalCount,
      loading,
      menuRef,
      renderNotFound,
      renderTotalCount
    } = this.props;

    if (!opened) {
      return null;
    }

    const isItems = items != null && items.length !== 0;

    if (!isItems && renderNotFound) {
      return (
        <Menu ref={menuRef}>
          <MenuItem disabled>
            {renderNotFound()}
          </MenuItem>
        </Menu>
      );
    }

    if (loading) {
      return (
        <Menu ref={menuRef}>
          <MenuItem disabled>
            <Spinner size="small" />
          </MenuItem>
        </Menu>
      );
    }

    let total = null;
    if (isItems && renderTotalCount) {
      total = (
        <MenuItem disabled>
          {renderTotalCount(items.length, totalCount)}
        </MenuItem>
      );
    }

    return (
      <Menu ref={menuRef}>
        {items.map(this.renderItem)}
        {total}
      </Menu>
    );
  }

  renderItem = (item: *, index: number) => {
    return (
      <MenuItem onClick={() => this.props.onChange(item)} key={index}>
        {this.props.renderItem(item)}
      </MenuItem>
    );
  };

  renderInput() {
    const {
      editing,
      error,
      onActivate,
      onFocus,
      onInputChange,
      onInputKeyDown,
      renderValue,
      textValue,
      value
    } = this.props;

    if (editing) {
      return (
        <Input
          error={error}
          onChange={onInputChange}
          value={textValue}
          onKeyDown={onInputKeyDown}
        />
      );
    }

    return (
      <InputLikeText error={error} onFocus={onFocus} onMouseDown={onActivate}>
        {renderValue(value)}
      </InputLikeText>
    );
  }
}

export default View;
