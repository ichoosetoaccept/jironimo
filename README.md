# Jironimo

A simple Chrome extension to copy your Jira session cookie for CLI authentication.

Companion to [ichoosetoaccept/jira-cli](https://github.com/ichoosetoaccept/jira-cli) - a fork with cookie-based authentication for enterprise Jira behind SSO/proxy.

## Why?

When your Jira is behind SSO or a reverse proxy, you can't use API tokens. The jira-cli fork supports cookie-based auth, but you need to manually copy the `JSESSIONID` cookie from your browser. This extension makes that one click.

## Installation

### Download (Recommended)

1. Download `jironimo.zip` from the [latest release](https://github.com/ichoosetoaccept/jironimo/releases/latest)
2. Unzip to a folder
3. Load in Chrome/Vivaldi/Edge:
   - Go to `chrome://extensions`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the unzipped folder

### From Source

1. Clone and build:
   ```sh
   git clone https://github.com/ichoosetoaccept/jironimo.git
   cd jironimo
   bun install
   bun run build
   ```

2. Load the `dist/` folder as an unpacked extension (see above)

## Usage

1. Navigate to your Jira instance in the browser
2. Sign in (authenticate via SSO/certificate as needed)
3. Click the Jironimo extension icon - the cookie is automatically copied!
4. Run `jira refresh` and paste when prompted

## License

MIT
