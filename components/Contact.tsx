
import React from 'react';
import type { ContactMethod } from '../types';
import { LinkedInIcon, EmailIcon, PhoneIcon, PencilIcon } from './icons';

interface ContactProps {
    title: string;
    subtitle: string;
    contactMethods: ContactMethod[];
    isEditing: boolean;
    onEdit: () => void;
}

const iconMap: { [key in ContactMethod['type']]: React.FC<{className?: string}> } = {
    linkedin: (props) => <LinkedInIcon {...props} />,
    email: (props) => <EmailIcon {...props} className="w-6 h-6 text-red-600" />,
    phone: (props) => <PhoneIcon {...props} className="w-6 h-6 text-blue-500" />,
};

const Contact: React.FC<ContactProps> = ({ title, subtitle, contactMethods, isEditing, onEdit }) => {
  return (
    <section id="contact" className="py-20 bg-white relative">
      {isEditing && (
        <button onClick={onEdit} className="absolute top-4 right-4 bg-brand-green text-white p-2 rounded-full hover:opacity-80 transition-opacity">
            <PencilIcon />
        </button>
      )}
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-serif text-brand-text mb-4">{title}</h2>
        <p className="max-w-2xl mx-auto text-brand-text-secondary mb-8">
          {subtitle}
        </p>
        <div className="flex flex-wrap justify-center items-center gap-4">
          {contactMethods.map((method) => {
            const Icon = iconMap[method.type];
            return (
              <a 
                key={method.type}
                href={method.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-white border border-gray-200 text-brand-text-secondary font-medium py-2 px-5 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 shadow-sm"
              >
                <Icon />
                <span className="underline">{method.label}</span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Contact;