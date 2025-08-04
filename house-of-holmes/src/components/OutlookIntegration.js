import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import outlookService from '../services/outlookService';

const OutlookIntegration = () => {
  const { t } = useTranslation();
  const [syncStatus, setSyncStatus] = useState('');
  const [syncResults, setSyncResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [connectionTest, setConnectionTest] = useState(null);

  const testConnection = async () => {
    setIsLoading(true);
    setConnectionTest(null);
    
    try {
      const result = await outlookService.testConnection();
      setConnectionTest(result);
    } catch (error) {
      setConnectionTest({
        success: false,
        message: `Connection test failed: ${error.message}`
      });
    } finally {
      setIsLoading(false);
    }
  };

  const performSync = async () => {
    setIsLoading(true);
    setSyncStatus('Starting full sync...');
    setSyncResults(null);
    
    try {
      const result = await outlookService.fullSync();
      if (result.success) {
        setSyncResults({
          emails: result.data.emails.data?.synced || 0,
          contacts: result.data.contacts.data?.synced || 0,
          events: result.data.events.data?.synced || 0,
          total: result.data.total || 0
        });
        setSyncStatus(result.message);
      } else {
        setSyncStatus(`Sync failed: ${result.error}`);
        setSyncResults({ emails: 0, contacts: 0, events: 0, total: 0 });
      }
    } catch (error) {
      setSyncStatus(`Sync failed: ${error.message}`);
      setSyncResults({ emails: 0, contacts: 0, events: 0, total: 0 });
    } finally {
      setIsLoading(false);
    }
  };

  const syncEmails = async () => {
    setIsLoading(true);
    setSyncStatus('Syncing emails...');
    
    try {
      const result = await outlookService.syncEmails();
      if (result.success) {
        setSyncStatus(result.message);
        setSyncResults({
          emails: result.data.synced,
          contacts: 0,
          events: 0,
          total: result.data.synced
        });
      } else {
        setSyncStatus(`Email sync failed: ${result.error}`);
        setSyncResults({ emails: 0, contacts: 0, events: 0, total: 0 });
      }
    } catch (error) {
      setSyncStatus(`Email sync failed: ${error.message}`);
      setSyncResults({ emails: 0, contacts: 0, events: 0, total: 0 });
    } finally {
      setIsLoading(false);
    }
  };

  const syncContacts = async () => {
    setIsLoading(true);
    setSyncStatus('Syncing contacts...');
    
    try {
      const result = await outlookService.syncContacts();
      if (result.success) {
        setSyncStatus(result.message);
        setSyncResults({
          emails: 0,
          contacts: result.data.synced,
          events: 0,
          total: result.data.synced
        });
      } else {
        setSyncStatus(`Contact sync failed: ${result.error}`);
        setSyncResults({ emails: 0, contacts: 0, events: 0, total: 0 });
      }
    } catch (error) {
      setSyncStatus(`Contact sync failed: ${error.message}`);
      setSyncResults({ emails: 0, contacts: 0, events: 0, total: 0 });
    } finally {
      setIsLoading(false);
    }
  };

  const syncEvents = async () => {
    setIsLoading(true);
    setSyncStatus('Syncing calendar events...');
    
    try {
      const result = await outlookService.syncEvents();
      if (result.success) {
        setSyncStatus(result.message);
        setSyncResults({
          emails: 0,
          contacts: 0,
          events: result.data.synced,
          total: result.data.synced
        });
      } else {
        setSyncStatus(`Event sync failed: ${result.error}`);
        setSyncResults({ emails: 0, contacts: 0, events: 0, total: 0 });
      }
    } catch (error) {
      setSyncStatus(`Event sync failed: ${error.message}`);
      setSyncResults({ emails: 0, contacts: 0, events: 0, total: 0 });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="outlook-integration-section">
      <h2>{t('outlook.title', 'Outlook Integration')}</h2>
      
      <div className="integration-info">
        <p>
          Connect your Outlook account to automatically sync emails, contacts, and calendar events with Odoo.
        </p>
      </div>

      <div className="integration-controls">
        <div className="control-group">
          <h3>🔗 Connection Test</h3>
          <button 
            className="test-btn"
            onClick={testConnection}
            disabled={isLoading}
          >
            {isLoading ? 'Testing...' : 'Test Outlook Connection'}
          </button>
          
          {connectionTest && (
            <div className={`test-result ${connectionTest.success ? 'success' : 'error'}`}>
              <h4>{connectionTest.success ? '✅ Connected' : '❌ Connection Failed'}</h4>
              <p>{connectionTest.message}</p>
              {connectionTest.data && (
                <div className="test-data">
                  <p>👤 User: {connectionTest.data.user}</p>
                  <p>🔐 Status: {connectionTest.data.status}</p>
                  <p>📋 Permissions: {connectionTest.data.permissions.join(', ')}</p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="control-group">
          <h3>🔄 Sync Operations</h3>
          
          <div className="sync-buttons">
            <button 
              className="sync-btn"
              onClick={syncEmails}
              disabled={isLoading}
            >
              📧 Sync Emails
            </button>
            
            <button 
              className="sync-btn"
              onClick={syncContacts}
              disabled={isLoading}
            >
              👥 Sync Contacts
            </button>
            
            <button 
              className="sync-btn"
              onClick={syncEvents}
              disabled={isLoading}
            >
              📅 Sync Events
            </button>
            
            <button 
              className="sync-btn full-sync"
              onClick={performSync}
              disabled={isLoading}
            >
              🚀 Full Sync
            </button>
          </div>

          {syncStatus && (
            <div className="sync-status">
              <p>{syncStatus}</p>
            </div>
          )}

          {syncResults && (
            <div className="sync-results">
              <h4>📊 Sync Results</h4>
              <div className="results-grid">
                <div className="result-item">
                  <span className="result-label">Emails:</span>
                  <span className="result-value">{syncResults.emails}</span>
                </div>
                <div className="result-item">
                  <span className="result-label">Contacts:</span>
                  <span className="result-value">{syncResults.contacts}</span>
                </div>
                <div className="result-item">
                  <span className="result-label">Events:</span>
                  <span className="result-value">{syncResults.events}</span>
                </div>
                <div className="result-item total">
                  <span className="result-label">Total:</span>
                  <span className="result-value">{syncResults.total}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="integration-features">
          <h3>✨ Integration Features</h3>
          <div className="features-grid">
            <div className="feature-item">
              <h4>📧 Email Sync</h4>
              <ul>
                <li>Incoming emails create leads in Odoo</li>
                <li>Email senders become contacts</li>
                <li>Email threading and attachments</li>
                <li>Automatic follow-up reminders</li>
              </ul>
            </div>
            
            <div className="feature-item">
              <h4>👥 Contact Sync</h4>
              <ul>
                <li>Outlook contacts sync to Odoo customers</li>
                <li>Bidirectional contact updates</li>
                <li>Contact categories and tags</li>
                <li>Email history attached to contacts</li>
              </ul>
            </div>
            
            <div className="feature-item">
              <h4>📅 Calendar Sync</h4>
              <ul>
                <li>Outlook meetings appear in Odoo</li>
                <li>Meeting attendees sync as contacts</li>
                <li>Recurring events support</li>
                <li>Calendar reminders and notifications</li>
              </ul>
            </div>
            
            <div className="feature-item">
              <h4>🔄 Automation</h4>
              <ul>
                <li>Automatic lead creation from emails</li>
                <li>Email-to-ticket conversion</li>
                <li>Meeting-to-task conversion</li>
                <li>Real-time sync notifications</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OutlookIntegration; 