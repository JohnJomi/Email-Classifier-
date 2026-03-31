# Email AI Classifier

An intelligent email classification system that leverages Google Apps Script and Gemini AI to automatically categorize Gmail messages with hierarchical labels, visualized through a Safari extension.

## Project Architecture

```
Gmail
  ↓
Google Apps Script (Apps Script)
  ↓
Gemini Batch Classification API
  ↓
Hierarchical Email Labels
  ↓
Safari Extension UI
```

### System Overview

1. **Gmail Integration**: Connects to Gmail via Google Apps Script to access and process incoming emails.
2. **Apps Script Processing**: Google Apps Script serves as the backend orchestrator, handling email retrieval and API communication.
3. **Gemini Batch Classification**: Uses Google's Gemini AI to classify emails into hierarchical categories with batch processing for efficiency.
4. **Label Management**: Automatically applies hierarchical labels to emails based on classification results.
5. **Safari Extension UI**: Provides a user-friendly interface within Safari to view and manage classified emails and their labels.

## Directory Structure

- **`apps-script/`** - Google Apps Script project files and source code
- **`safari-extension/`** - Safari extension implementation (content scripts, background logic, manifest)
- **`prompts/`** - AI classification prompts and system messages
- **`docs/`** - Architecture documentation and guides

## Getting Started

See individual README files in each directory for setup and development instructions.

## Requirements

- Google Account with Gmail and access to Google Apps Script
- Safari browser (macOS)
- Node.js (for development tooling)
- Google Cloud Project with Gemini API access
- NextJS
- MongoDB

## Development

Each component has its own development workflow. See the respective README files:
- [Apps Script](./apps-script/README.md)
- [Safari Extension](./safari-extension/README.md)
- [Prompts Documentation](./prompts/)
- [Architecture Docs](./docs/)

## License

[Add appropriate license]
