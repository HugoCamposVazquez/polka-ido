import * as React from 'react';

import { styled } from '../utils/css';

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
      padding: 15px;
    `;

    const reloadLinkStyle = styled.cssStyle`
      text-decoration: underline;
      color: dodgerblue;
      font-weight: bold;
    `;

    const additionalInfoStyle = styled.cssStyle`
      margin-top: 12px;
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
