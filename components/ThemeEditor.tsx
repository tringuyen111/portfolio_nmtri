import React, { useState } from 'react';
import type { AppSettings } from '../types';
import { FontIcon, CloseIcon } from './icons';

interface ThemeEditorProps {
    settings: AppSettings;
    onSettingsChange: (newSettings: AppSettings) => void;
    labels: {
        title: string;
        fontSettings: string;
        sansSerifFont: string;
        serifFont: string;
        baseFontSize: string;
    }
}

const sansSerifFonts = ['Inter', 'Lato', 'Roboto'];
const serifFonts = ['Playfair Display', 'Lora', 'Merriweather'];

const ThemeEditor: React.FC<ThemeEditorProps> = ({ settings, onSettingsChange, labels }) => {
    const [isOpen, setIsOpen] = useState(true);

    if (!isOpen) {
        return (
             <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 z-50 bg-brand-green text-white p-4 rounded-full shadow-lg hover:opacity-90 transition-all animate-fade-in"
                aria-label={labels.title}
            >
                <FontIcon className="w-6 h-6" />
            </button>
        );
    }
    
    return (
        <div className="fixed bottom-6 right-6 z-50 bg-white w-full max-w-xs rounded-xl shadow-2xl border border-gray-200 animate-slide-up">
            <header className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50 rounded-t-xl">
                <div className="flex items-center gap-2">
                    <FontIcon className="w-5 h-5 text-brand-green" />
                    <h3 className="font-bold text-brand-text">{labels.title}</h3>
                </div>
                <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-800">
                    <CloseIcon className="w-5 h-5"/>
                </button>
            </header>
            <div className="p-4 space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{labels.sansSerifFont}</label>
                     <select
                        value={settings.fontFamilySans}
                        onChange={(e) => onSettingsChange({ ...settings, fontFamilySans: e.target.value })}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    >
                        {sansSerifFonts.map(font => <option key={font} value={font}>{font}</option>)}
                    </select>
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{labels.serifFont}</label>
                     <select
                        value={settings.fontFamilySerif}
                        onChange={(e) => onSettingsChange({ ...settings, fontFamilySerif: e.target.value })}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    >
                        {serifFonts.map(font => <option key={font} value={font}>{font}</option>)}
                    </select>
                </div>
                <div>
                    <label htmlFor="baseFontSize" className="block text-sm font-medium text-gray-700 mb-1">{labels.baseFontSize}: <span className="font-bold">{settings.baseFontSize}px</span></label>
                    <input
                        id="baseFontSize"
                        type="range"
                        min="14"
                        max="20"
                        step="0.5"
                        value={settings.baseFontSize}
                        onChange={(e) => onSettingsChange({ ...settings, baseFontSize: parseFloat(e.target.value) })}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                </div>
            </div>
        </div>
    );
};

export default ThemeEditor;