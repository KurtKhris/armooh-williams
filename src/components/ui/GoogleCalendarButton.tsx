'use client';

import Script from 'next/script';
import { useRef, useEffect } from 'react';

declare global {
  interface Window {
    calendar?: {
      schedulingButton: {
        load: (opts: { url: string; color: string; label: string; target: HTMLElement }) => void;
      };
    };
  }
}

const BOOKING_URL =
  'https://calendar.google.com/calendar/appointments/AcZssZ2GDJMlLObqrZgcvSDljz5vUBbLNsq8lFU3P1k=?gv=true';

interface Props {
  label?: string;
  color?: string;
  className?: string;
}

export default function GoogleCalendarButton({
  label = 'Book a Consultation',
  color = '#C41E24',
  className,
}: Props) {
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cssId = 'google-cal-css';
    if (!document.getElementById(cssId)) {
      const link = document.createElement('link');
      link.id = cssId;
      link.href =
        'https://calendar.google.com/calendar/scheduling-button-script.css';
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }
  }, []);

  const init = () => {
    if (targetRef.current && window.calendar?.schedulingButton) {
      window.calendar.schedulingButton.load({
        url: BOOKING_URL,
        color,
        label,
        target: targetRef.current,
      });
    }
  };

  return (
    <div className={className}>
      <div ref={targetRef} />
      <Script
        id="google-cal-scheduling"
        src="https://calendar.google.com/calendar/scheduling-button-script.js"
        strategy="afterInteractive"
        onReady={init}
      />
    </div>
  );
}
