import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Bell, Lock, Mail, Shield, User, Database, Moon } from 'lucide-react';

interface SettingsState {
  emailNotifications: boolean;
  smsNotifications: boolean;
  darkMode: boolean;
  twoFactorAuth: boolean;
  autoBackup: boolean;
  autoLogout: boolean;
  recordRetention: '1year' | '3years' | '5years' | '7years' | 'indefinite';
  dataExport: 'weekly' | 'monthly' | 'quarterly' | 'manual';
}

const Settings = () => {
  const [settings, setSettings] = useState<SettingsState>({
    emailNotifications: true,
    smsNotifications: false,
    darkMode: false,
    twoFactorAuth: true,
    autoBackup: true,
    autoLogout: false,
    recordRetention: '3years',
    dataExport: 'monthly'
  });

  const handleSettingChange = <K extends keyof SettingsState>(
    setting: K,
    value: SettingsState[K]
  ) => {
    setSettings(prev => ({ ...prev, [setting]: value }));
    // Implement your settings update logic here
  };

  return (
    <div className="space-y-6 p-6">
      <h2 className="text-3xl font-bold">System Settings</h2>

      {/* Notifications Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notification Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between py-3">
            <div>
              <h3 className="font-medium">Email Notifications</h3>
              <p className="text-sm text-muted-foreground">Receive updates via email</p>
            </div>
            <Switch 
              checked={settings.emailNotifications}
              onCheckedChange={(checked: boolean) => handleSettingChange('emailNotifications', checked)}
            />
          </div>
          <div className="flex items-center justify-between py-3">
            <div>
              <h3 className="font-medium">SMS Notifications</h3>
              <p className="text-sm text-muted-foreground">Get alerts via SMS</p>
            </div>
            <Switch 
              checked={settings.smsNotifications}
              onCheckedChange={(checked: boolean) => handleSettingChange('smsNotifications', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Security Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between py-3">
            <div>
              <h3 className="font-medium">Two-Factor Authentication</h3>
              <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
            </div>
            <Switch 
              checked={settings.twoFactorAuth}
              onCheckedChange={(checked: boolean) => handleSettingChange('twoFactorAuth', checked)}
            />
          </div>
          <div className="flex items-center justify-between py-3">
            <div>
              <h3 className="font-medium">Automatic Logout</h3>
              <p className="text-sm text-muted-foreground">After 30 minutes of inactivity</p>
            </div>
            <Switch 
              checked={settings.autoLogout}
              onCheckedChange={(checked: boolean) => handleSettingChange('autoLogout', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Data Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Data Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between py-3">
            <div>
              <h3 className="font-medium">Automatic Backup</h3>
              <p className="text-sm text-muted-foreground">Daily backup of all records</p>
            </div>
            <Switch 
              checked={settings.autoBackup}
              onCheckedChange={(checked: boolean) => handleSettingChange('autoBackup', checked)}
            />
          </div>
          <div className="space-y-2">
            <h3 className="font-medium">Record Retention Period</h3>
            <select 
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              value={settings.recordRetention}
              onChange={(e) => handleSettingChange('recordRetention', e.target.value as SettingsState['recordRetention'])}
            >
              <option value="1year">1 Year</option>
              <option value="3years">3 Years</option>
              <option value="5years">5 Years</option>
              <option value="7years">7 Years</option>
              <option value="indefinite">Indefinite</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* System Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Moon className="h-5 w-5" />
            System Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between py-3">
            <div>
              <h3 className="font-medium">Dark Mode</h3>
              <p className="text-sm text-muted-foreground">Toggle dark theme</p>
            </div>
            <Switch 
              checked={settings.darkMode}
              onCheckedChange={(checked: boolean) => handleSettingChange('darkMode', checked)}
            />
          </div>
          <div className="space-y-2">
            <h3 className="font-medium">Data Export Schedule</h3>
            <select 
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              value={settings.dataExport}
              onChange={(e) => handleSettingChange('dataExport', e.target.value as SettingsState['dataExport'])}
            >
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="manual">Manual Only</option>
            </select>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;