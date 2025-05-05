const fs = require('fs').promises;
const path = require('path');

/**
 * Gets the list of email subscribers
 * @returns {Promise<string[]>} Array of email addresses
 */
async function getSubscribers() {
  try {
    const subscribersPath = path.join(__dirname, '../data/subscribers.json');
    const data = await fs.readFile(subscribersPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading subscribers file:', error);
    return [];
  }
}

/**
 * Formats subscriber emails for use in notification services
 * Returns emails in a format suitable for GitHub Actions
 * @returns {Promise<string>} Comma-separated list of emails
 */
async function getFormattedSubscriberEmails() {
  const subscribers = await getSubscribers();
  return subscribers.join(',');
}

module.exports = {
  getSubscribers,
  getFormattedSubscriberEmails
};