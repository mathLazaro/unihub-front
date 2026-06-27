import React, { useEffect, useState, useRef } from "react";
import { BellIcon, CheckCircleIcon } from "@phosphor-icons/react";
import { 
  getNotifications, 
  hasUnviewedNotifications, 
  markAllAsViewed, 
  markAsViewed 
} from "../../api/notifications.api";
import type { Notification } from "../../core/notification/notification.model";

export function NotificationBell() {
  const [hasUnviewed, setHasUnviewed] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const checkUnviewed = async () => {
    try {
      const hasUnread = await hasUnviewedNotifications();
      setHasUnviewed(hasUnread);
    } catch (e) {
      console.error(e);
    }
  };

  const dropdownRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    checkUnviewed();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = async () => {
    if (!isOpen) {
      try {
        const notifs = await getNotifications();
        setNotifications(notifs);
        if (hasUnviewed) {
          await markAllAsViewed();
          setHasUnviewed(false);
        }
      } catch (e) {
        console.error(e);
      }
    }
    setIsOpen(!isOpen);
  };

  const markSpecificAsViewed = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await markAsViewed(id);
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, viewed: true } : n));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={toggleDropdown}
        className={`section-button text-sm ${isOpen ? "active" : ""}`}
      >
        <div className="relative">
          <BellIcon size={32} />
          {hasUnviewed && (
            <span 
              className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"
            ></span>
          )}
        </div>
        <span>Notificações</span>
      </button>

      {isOpen && (
        <div 
          className="absolute right-0 mt-2 w-80 bg-white border rounded-lg shadow-lg overflow-hidden z-50 text-left"
        >
          <div className="p-3 border-b bg-gray-50 flex justify-between items-center">
            <h3 className="font-semibold text-sm text-gray-700">Notificações</h3>
          </div>
          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <p className="text-center text-sm text-gray-500 p-4">Nenhuma notificação.</p>
            ) : (
              notifications.map((n) => (
                <div 
                  key={n.id} 
                  className={`p-3 border-b text-sm flex justify-between items-start ${n.viewed ? 'bg-white text-gray-500' : 'bg-blue-50 text-gray-800'}`}
                >
                  <span>{n.message}</span>
                  {!n.viewed && (
                    <button 
                      onClick={(e) => markSpecificAsViewed(n.id, e)} 
                      title="Marcar como lida"
                      className="ml-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                    >
                      <CheckCircleIcon size={18} className="text-blue-500 hover:text-blue-700" />
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
