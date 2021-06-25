import * as React from 'react';

import * as styles from './ErrorBoundary.styles';

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
    if (this.state.hasError) {
      return (
        <div style={styles.errorPageContainerStyle}>
          <div>
            <div>Sorry, something went wrong. Please try to reload:</div>
            <div>
              <a style={styles.reloadLinkStyle} href="/">
                Reload
              </a>
            </div>
            <div style={styles.additionalInfoStyle}>If the issue persists, please notify an administrator.</div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
