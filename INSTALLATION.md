# Installation Guide

## For n8n Cloud/Desktop Users

### Method 1: Via npm (Recommended)

1. In n8n, go to **Settings** → **Community Nodes**
2. Click **Add** and enter: `npm:n8n-node-skapi`
3. Click **Install**

### Method 2: Via URL (If published to GitHub)

1. In n8n, go to **Settings** → **Community Nodes**
2. Click **Add** and enter: `https://github.com/oleg-zaharenok/skapi-pro-n8n`
3. Click **Install**

## For Self-Hosted n8n

### Install locally

```bash
cd ~/.n8n
npm install n8n-node-skapi
```

Then restart n8n:

```bash
n8n restart
```

### Install from source

```bash
git clone https://github.com/oleg-zaharenok/skapi-pro-n8n.git
cd skapi-pro-n8n
npm install
npm run build
cd ~/.n8n
npm link ../skapi-pro-n8n
```

Then restart n8n.

## Getting Started

### 1. Get Your JWT Token

1. Install the [SkAPI.pro Chrome Extension](https://skapi.pro)
2. Open the extension popup
3. Copy your JWT token from the extension

### 2. Create Credentials in n8n

1. Create a new workflow in n8n
2. Add a **SkAPI.pro** node
3. Click **Create New Credential** → **SkAPI.pro API**
4. Paste your JWT token
5. Optionally add a Client ID for tracking
6. Click **Save**

### 3. Use the Node

Now you can use the SkAPI.pro node in your workflows:

- **Check Join Requests**: Get pending join requests
- **Process Join Request**: Approve or decline requests
- **Check Messages**: Get new messages
- **Check Notifications**: Get Skool notifications

## Example Workflows

### Auto-Approve Join Requests

```
[Cron: Every 5 minutes] → [SkAPI.pro: Check Join Requests] → [Switch: Has Requests?] → [SkAPI.pro: Process Join Request (Approve)] → [Send Welcome Message] → [Add to CRM]
```

### Monitor Messages

```
[Cron: Every 10 minutes] → [SkAPI.pro: Check Messages] → [Filter: New Messages Only] → [Slack: Send Notification]
```

### Check Notifications

```
[Cron: Every hour] → [SkAPI.pro: Check Notifications] → [Filter: Important] → [Email: Send Alert]
```

## Troubleshooting

### Node not showing up

1. Make sure you installed the node correctly
2. Restart n8n
3. Check community nodes list in Settings

### Authentication errors

1. Verify your JWT token is valid
2. Check if your SkAPI.pro subscription is active
3. Ensure you're not exceeding rate limits

### Rate limit errors

- Free: 100 requests/month
- Pro: 1000 requests/month
- Enterprise: Unlimited

Upgrade at [SkAPI.pro](https://skapi.pro)

## Support

- Documentation: [SkAPI.pro Docs](https://skapi.pro/docs)
- Email: support@skapi.pro
- GitHub Issues: [Report an issue](https://github.com/oleg-zaharenok/skapi-pro-n8n/issues)
