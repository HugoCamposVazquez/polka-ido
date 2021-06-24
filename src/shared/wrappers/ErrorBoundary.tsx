import * as React from 'react';

import { sideColor11 } from '../../utils/colorsUtil';
import { styled } from '../../utils/css';

export class ErrorBoundary extends React.Component<React.ComponentClass, { hasError: boolean }> {
  public constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  public static getDerivedStateFromError() {
    return { hasError: true };
  }

  public componentDidCatch(error: any, errorInfo: any) {
    console.error(error, errorInfo);
  }

  public render() {
    const errorPageContainerStyle = styled.cssStyle`
      padding: 0.94rem;
    `;

    const reloadLinkStyle = styled.cssStyle`
      text-decoration: underline;
      color: ${sideColor11};
      font-weight: bold;
    `;

    const additionalInfoStyle = styled.cssStyle`
      margin-top: 0.75rem;
    `;

    if (this.state.hasError) {
      return (
        <div style={errorPageContainerStyle}>
          <div>
            <div>Sorry, something went wrong. Please try to reload:</div>
            <div>
              <a style={reloadLinkStyle} href="/">
                Reload
              </a>
            </div>
            <div style={additionalInfoStyle}>If the issue persists, please notify an administrator.</div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
