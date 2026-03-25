/**
 * React Error Boundary component.
 * Catches rendering errors in child components and shows a
 * graceful fallback UI instead of crashing the entire page.
 */

"use client";

import { Component, ReactNode } from "react";

type ErrorBoundaryProps = {
  children: ReactNode;
  /** Optional custom fallback UI. If not provided, uses the default. */
  fallback?: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
  error: Error | null;
};

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // Log the error for observability
    console.error(
      JSON.stringify({
        timestamp: new Date().toISOString(),
        level: "error",
        action: "react_error_boundary",
        context: {
          error: error.message,
          stack: error.stack?.substring(0, 500),
          componentStack: errorInfo.componentStack?.substring(0, 500),
        },
      })
    );
  }

  render() {
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI
      return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center bg-cream">
          <h2 className="font-heading text-3xl text-forest mb-4">
            Something went wrong
          </h2>
          <p className="text-text-muted mb-8 max-w-md">
            We're sorry — an unexpected error occurred. Please try refreshing the 
            page or contact us directly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              className="px-6 py-3 bg-forest hover:bg-forest-light text-cream font-medium rounded-sm transition-colors"
            >
              Try Again
            </button>
            <a
              href="tel:+918920018563"
              className="px-6 py-3 bg-gold hover:bg-gold-light text-forest font-medium rounded-sm transition-colors"
            >
              Call Us: +91 89200 18563
            </a>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
