import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an unhandled error:", error, errorInfo);
    this.setState({ errorInfo });
    if (this.props.onError) {
      try {
        this.props.onError(error, errorInfo);
      } catch (e) {
        console.error("ErrorBoundary onError callback failed:", e);
      }
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        if (typeof this.props.fallback === "function") {
          return this.props.fallback({
            error: this.state.error,
            resetError: this.handleReset,
          });
        }
        return this.props.fallback;
      }

      return (
        <div
          style={{
            padding: "32px 24px",
            margin: "24px auto",
            maxWidth: "680px",
            background: "var(--card-bg, #ffffff)",
            border: "1px solid var(--border, #e2e8f0)",
            borderRadius: "16px",
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.08)",
            textAlign: "center",
            fontFamily: "var(--font-sans, system-ui, sans-serif)",
          }}
        >
          <div style={{ fontSize: "42px", marginBottom: "12px" }}>⚠️</div>
          <h3 style={{ fontSize: "1.3rem", fontWeight: 700, margin: "0 0 8px 0", color: "var(--text, #1e293b)" }}>
            {this.props.title || "Something went wrong in this view"}
          </h3>
          <p style={{ fontSize: "0.92rem", color: "var(--muted, #64748b)", margin: "0 0 20px 0", lineHeight: "1.5" }}>
            {this.props.message ||
              "An unexpected error occurred while loading this section. You can try recovering this view or return to the main dashboard."}
          </p>
          <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
            <button
              onClick={this.handleReset}
              className="action-btn"
              style={{
                padding: "10px 18px",
                background: "var(--primary, #3b82f6)",
                color: "#ffffff",
                border: "none",
                borderRadius: "8px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              🔄 Try Again
            </button>
            <button
              onClick={() => window.location.reload()}
              className="action-btn"
              style={{
                padding: "10px 18px",
                background: "var(--card-light, #f1f5f9)",
                color: "var(--text, #1e293b)",
                border: "1px solid var(--border, #cbd5e1)",
                borderRadius: "8px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              🔁 Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
