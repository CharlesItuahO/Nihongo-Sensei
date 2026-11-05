/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext.tsx';
import { Header } from './components/Header.tsx';
import { ConversationView } from './components/ConversationView.tsx';
import { MyWordsView } from './components/MyWordsView.tsx';
import { DictionarySearchView } from './components/DictionarySearchView.tsx';
import { WordCardModal } from './components/WordCardModal.tsx';
import { OnboardingModal } from './components/OnboardingModal.tsx';
import { SettingsModal } from './components/SettingsModal.tsx';

function MainApp() {
  const { currentView } = useApp();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F4] dark:bg-[#171513] text-stone-900 dark:text-stone-100 antialiased selection:bg-rose-100 selection:text-rose-900">
      {/* Top Header */}
      <Header onOpenSettings={() => setIsSettingsOpen(true)} />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-h-0">
        {currentView === 'chat' && <ConversationView />}
        {currentView === 'saved' && (
          <div className="flex-1 overflow-y-auto">
            <MyWordsView />
          </div>
        )}
        {currentView === 'dictionary' && (
          <div className="flex-1 overflow-y-auto">
            <DictionarySearchView />
          </div>
        )}
      </main>

      {/* Global Modals and Drawers */}
      <WordCardModal />
      <OnboardingModal />
      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
