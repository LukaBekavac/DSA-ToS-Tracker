# DSA Terms of Service Tracker

## What is this?

This service monitors Terms of Service (ToS) changes for Very Large Online Platforms (VLOPs) under the Digital Services Act and sends you email notifications with AI-generated summaries of the changes.

## Why use this service?

- **Stay informed** about how platforms are updating their terms
- **Save time** with AI-generated summaries instead of reading lengthy legal texts
- **Never miss an update** with automatic email notifications
- **Free service** with no account creation needed - just add your email

## How it works

1. **Monitoring**: Our system checks for updates to Terms of Service documents every 5 minutes
2. **AI Analysis**: When changes are detected, GPT-4o mini creates a concise summary 
3. **Notification**: You receive an email with the summary of what changed
4. **Privacy-focused**: Your email is only used for sending notifications

## How to subscribe

Simply visit our website and enter your email address in the subscription form. You'll start receiving notifications whenever ToS documents are updated.

## Running your own instance

### Requirements

- GitHub account (for hosting the monitoring workflow)
- SendGrid account (for sending emails)
- OpenAI API key (for summarizing changes)

### Quick setup

1. Clone this repository
2. Add required secrets in GitHub repository settings:
   - `OPENAI_API_KEY`
   - `SENDGRID_API_KEY`
   - `MAIL_FROM` (verified sender email)
   - `MAIL_TO` (admin email)
3. Create an empty `LAST_SHA` variable in GitHub repository settings
4. Deploy the web service for collecting emails using:
   ```
   npm install
   npm start
   ```

For full technical details on how this system works, see our `.github/workflows` directory.
