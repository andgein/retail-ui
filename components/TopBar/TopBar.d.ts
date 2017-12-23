import * as React from 'react';

import { LogotypeProps } from '../Logotype';

import Divider from './Divider';
import TopBarButton from './ButtonItem';
import TopBarDropdown from './TopBarDropdown';
import TopBarOrganizations from './Organizations';

export interface TopBarProps {
  color?: string;
  leftItems?: React.ReactNode[];
  logoComponent?: React.ComponentType<LogotypeProps> | string;
  logoHref?: string;
  maxWidth?: string | number;
  noMargin?: boolean;
  noShadow?: boolean;
  noWidget?: boolean;
  onLogout?: () => void;
  rightItems?: React.ReactNode[];
  suffix?: string;
  userName?: string;
}

export interface TopBarState {}

export default class TopBar extends React.Component<TopBarProps, TopBarState> {
  static Divider: Divider;
  static Item: TopBarButton;
  static Dropdown: TopBarDropdown;
  static OrganizationsDropdown: TopBarOrganizations;
}
