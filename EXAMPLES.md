# Example Workflows

This guide provides practical examples of using the SkAPI.pro n8n node in your automation workflows.

## Table of Contents

- [Auto-Approve Join Requests](#auto-approve-join-requests)
- [Monitor New Messages](#monitor-new-messages)
- [Check Notifications](#check-notifications)
- [Complex Multi-Step Automation](#complex-multi-step-automation)

---

## Auto-Approve Join Requests

### Use Case
Automatically approve join requests for your Skool community and send a welcome message to new members.

### Workflow

```
┌─────────────────────────────────────────────────────────────┐
│  [Cron] → [Check Join Requests] → [Filter] → [Approve] → [Welcome] → [CRM] │
└─────────────────────────────────────────────────────────────┘
```

### Step-by-Step

1. **Cron Node**
   - Run every 5 minutes
   - Cron expression: `*/5 * * * *`

2. **SkAPI.pro: Check Join Requests**
   - Resource: Join Request
   - Operation: Check Join Requests
   - Group: `your-group-id`
   - Limit: 20

3. **Filter Node**
   - Condition: `{{ $json.length > 0 }}`
   - Only continue if there are pending requests

4. **Loop Over Items**
   - Loop through each join request

5. **SkAPI.pro: Process Join Request**
   - Resource: Join Request
   - Operation: Process Join Request
   - Group: `your-group-id`
   - Action: Approve
   - Search By: Name
   - Search Value: `{{ $json.name }}`

6. **Send Welcome Message** (Future feature)
   - Resource: Join Request
   - Operation: Send Welcome Message
   - Group: `your-group-id`
   - Message: "Welcome to our community! 🎉"

7. **Add to CRM** (Example: HubSpot, Airtable)
   - Add user to your CRM
   - Track where they came from

### Example JSON from Check Join Requests

```json
[
  {
    "name": "John Doe",
    "email": "john@example.com",
    "profile_url": "https://skool.com/profile/john-doe",
    "joined_at": "2024-01-15T10:30:00Z",
    "spam_risk": "low"
  }
]
```

---

## Monitor New Messages

### Use Case
Get notified in Slack whenever there are new messages in your Skool group.

### Workflow

```
┌──────────────────────────────────────────────────┐
│  [Cron] → [Check Messages] → [Filter] → [Slack] │
└──────────────────────────────────────────────────┘
```

### Step-by-Step

1. **Cron Node**
   - Run every 10 minutes
   - Cron expression: `*/10 * * * *`

2. **SkAPI.pro: Check Messages**
   - Resource: Message
   - Operation: Check Messages
   - Group: `your-group-id`
   - Limit: 50

3. **Filter Node**
   - Condition: `{{ $json.length > 0 }}`
   - Only continue if there are new messages

4. **Loop Over Items**
   - Loop through each message

5. **Slack Node**
   - Channel: `#community-notifications`
   - Message: "New message from {{ $json.author }}: {{ $json.content }}"

---

## Check Notifications

### Use Case
Monitor important Skool notifications and send email alerts.

### Workflow

```
┌──────────────────────────────────────────────┐
│  [Cron] → [Check Notifications] → [Filter] → [Email] │
└──────────────────────────────────────────────┘
```

### Step-by-Step

1. **Cron Node**
   - Run every hour
   - Cron expression: `0 * * * *`

2. **SkAPI.pro: Check Notifications**
   - Resource: Notification
   - Operation: Check Notifications

3. **Filter Node**
   - Condition: `{{ $json.type === 'important' }}`
   - Only process important notifications

4. **Email Node**
   - To: `admin@yourdomain.com`
   - Subject: "Important Skool Notification: {{ $json.title }}"
   - Body: "{{ $json.description }}"

---

## Complex Multi-Step Automation

### Use Case
Complete user onboarding automation: approve join request, welcome them, add to CRM, notify team.

### Workflow

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  [Trigger] → [Check Requests] → [Approve] → [Welcome] → [CRM] → [Email] → [Slack] │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Step-by-Step

1. **Webhook Trigger**
   - Receive webhook from your application
   - Payload: `{ "email": "user@example.com" }`

2. **SkAPI.pro: Check Join Requests**
   - Resource: Join Request
   - Operation: Check Join Requests
   - Group: `your-group-id`

3. **Filter: Find User**
   - Condition: `{{ $json.email === $node["Webhook"].json.email }}`
   - Find the specific user

4. **SkAPI.pro: Process Join Request**
   - Action: Approve
   - Search By: Email
   - Search Value: `{{ $node["Webhook"].json.email }}`

5. **Wait Node**
   - Wait 30 seconds for approval to process

6. **SkAPI.pro: Send Welcome Message**
   - Message: "Welcome! Here's how to get started..."

7. **HubSpot: Create Contact**
   - Create contact in CRM
   - Add tags: "community-member"

8. **Gmail: Send Email**
   - Send personalized onboarding email

9. **Slack: Notify Team**
   - Channel: `#community-growth`
   - Message: "New member joined: {{ $json.name }}"

---

## Tips & Best Practices

### Error Handling

Always add error handling to your workflows:

```
[SkAPI.pro Node] → [IF Error] → [Slack: Alert Team]
```

### Rate Limiting

Check your rate limits before processing:

```
[HTTP Request: Get Rate Limit] → [IF Under Limit] → [Process]
```

### Data Storage

Store results in a database for analytics:

```
[SkAPI.pro] → [PostgreSQL: Insert] → [Google Sheets: Log]
```

### Testing

Always test with a small group first:

- Use "Check Join Requests" with limit=1
- Test "Process Join Request" manually
- Verify welcome messages work

---

## Need Help?

- Check the [Installation Guide](INSTALLATION.md)
- Read the [README](README.md)
- Visit [SkAPI.pro Docs](https://skapi.pro/docs)
- Open an issue on [GitHub](https://github.com/oleg-zaharenok/skapi-pro-n8n/issues)
