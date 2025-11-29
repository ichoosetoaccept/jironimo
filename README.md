# Jironimo

A simple Chrome extension to copy your Jira session cookie for CLI authentication.

Companion to [ichoosetoaccept/jira-cli](https://github.com/ichoosetoaccept/jira-cli) - a fork with cookie-based authentication for enterprise Jira behind SSO/proxy.

## Why?

When your Jira is behind SSO or a reverse proxy, you can't use API tokens. The jira-cli fork supports cookie-based auth, but you need to manually copy the `JSESSIONID` cookie from your browser. This extension makes that one click.

## Installation

### From Source

1. Clone and build:
   ```sh
   git clone https://github.com/ichoosetoaccept/jironimo.git
   cd jironimo
   bun install
   bun run build
   ```

2. Load in Chrome/Vivaldi/Edge:
   - Go to `chrome://extensions`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the `dist/` folder

## Usage

1. Navigate to your Jira instance in the browser
2. Sign in (authenticate via SSO/certificate as needed)
3. Click the Jironimo extension icon
4. Click "Copy JSESSIONID"
5. Run `jira refresh` and paste when prompted

## License

MIT
