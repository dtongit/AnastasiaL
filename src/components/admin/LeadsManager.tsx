'use client';

import { useState, useEffect } from 'react';
import { ContactRequest, ContactRequestStatus } from '@/types';
import {
  getContactRequests,
  updateContactStatus,
  deleteContactRequest,
} from '@/lib/supabase/queries';
import { isSupabaseConfigured } from '@/lib/supabase/client';
import {
  Phone,
  Mail,
  MessageSquare,
  MapPin,
  Calendar,
  Clock,
  Trash2,
  CheckCircle,
  RefreshCw,
  Inbox,
  Sparkles,
} from 'lucide-react';

export default function LeadsManager() {
  const [leads, setLeads] = useState<ContactRequest[]>([]);
  const [filter, setFilter] = useState<'all' | ContactRequestStatus>('all');
  const [isLoading, setIsLoading] = useState(true);

  const fetchLeads = async () => {
    setIsLoading(true);
    const data = await getContactRequests();
    setLeads(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleStatusChange = async (id: string, newStatus: ContactRequestStatus) => {
    await updateContactStatus(id, newStatus);
    setLeads((prev) =>
      prev.map((lead) => (lead.id === id ? { ...lead, status: newStatus } : lead))
    );
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Удалить эту заявку?')) return;
    await deleteContactRequest(id);
    setLeads((prev) => prev.filter((lead) => lead.id !== id));
  };

  const filteredLeads = leads.filter((l) => (filter === 'all' ? true : l.status === filter));

  const getStatusBadge = (status: ContactRequestStatus) => {
    switch (status) {
      case 'new':
        return <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-medium">Новая</span>;
      case 'in_progress':
        return <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-medium">В работе</span>;
      case 'completed':
        return <span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-medium">Завершена</span>;
      case 'archived':
        return <span className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-medium">Архив</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white rounded-3xl border border-sand/50 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl text-graphite font-medium">
            Заявки с сайта ({leads.length})
          </h2>
          <p className="text-xs sm:text-sm text-graphite/60 font-sans mt-1">
            Обращения клиентов, отправленные через интерактивную форму на лендинге
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchLeads}
            disabled={isLoading}
            className="px-4 py-2 rounded-full border border-sand/60 hover:bg-sand/20 text-graphite text-xs font-sans font-medium flex items-center gap-1.5 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            Обновить
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {(
          [
            { id: 'all', label: 'Все заявки' },
            { id: 'new', label: 'Новые' },
            { id: 'in_progress', label: 'В работе' },
            { id: 'completed', label: 'Завершенные' },
          ] as const
        ).map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={`px-4 py-2 rounded-full text-xs font-sans font-medium transition-all ${
              filter === tab.id
                ? 'bg-graphite text-milk shadow-sm'
                : 'bg-white border border-sand/50 text-graphite/70 hover:text-graphite'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Leads List */}
      {filteredLeads.length === 0 ? (
        <div className="bg-white rounded-3xl border border-sand/40 p-12 text-center space-y-3">
          <Inbox className="w-10 h-10 text-sand-dark mx-auto" />
          <h3 className="font-serif text-xl text-graphite font-medium">
            {filter === 'all' ? 'Пока нет полученных заявок' : 'Нет заявок в этом статусе'}
          </h3>
          <p className="text-xs text-graphite/60 font-sans max-w-md mx-auto">
            Когда посетители заполнят форму на главной странице, их запросы мгновенно появятся в этом разделе.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredLeads.map((lead) => {
            const cleanPhone = lead.phone.replace(/[^0-9+]/g, '');
            const waPhone = cleanPhone.startsWith('+') ? cleanPhone.slice(1) : cleanPhone;

            return (
              <div
                key={lead.id}
                className="bg-white rounded-3xl border border-sand/50 p-6 space-y-4 shadow-sm hover:border-olive/40 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-sand/30">
                  <div className="flex items-center gap-3">
                    <h3 className="font-serif text-2xl text-graphite font-medium">{lead.name}</h3>
                    {getStatusBadge(lead.status)}
                  </div>
                  <div className="flex items-center gap-4 text-xs font-sans text-graphite/50">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(lead.created_at).toLocaleDateString('ru-RU')}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {new Date(lead.created_at).toLocaleTimeString('ru-RU', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-sans">
                  <div className="space-y-1">
                    <span className="text-graphite/50 block">Телефон:</span>
                    <a
                      href={`tel:${cleanPhone}`}
                      className="font-medium text-graphite hover:text-olive flex items-center gap-1.5"
                    >
                      <Phone className="w-3.5 h-3.5 text-olive" />
                      {lead.phone}
                    </a>
                  </div>

                  {lead.email && (
                    <div className="space-y-1">
                      <span className="text-graphite/50 block">Email:</span>
                      <a
                        href={`mailto:${lead.email}`}
                        className="font-medium text-graphite hover:text-olive flex items-center gap-1.5"
                      >
                        <Mail className="w-3.5 h-3.5 text-olive" />
                        {lead.email}
                      </a>
                    </div>
                  )}

                  {lead.location && (
                    <div className="space-y-1">
                      <span className="text-graphite/50 block">Локация участка:</span>
                      <span className="font-medium text-graphite flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-olive" />
                        {lead.location}
                      </span>
                    </div>
                  )}
                </div>

                {lead.service_type && (
                  <div className="p-3 bg-sand/20 rounded-xl text-xs font-sans">
                    <span className="text-graphite/60">Интересующий формат: </span>
                    <span className="font-medium text-graphite">{lead.service_type}</span>
                  </div>
                )}

                {lead.message && (
                  <div className="p-4 bg-milk-light rounded-2xl border border-sand/40 text-xs text-graphite/80 font-sans leading-relaxed">
                    <span className="font-medium text-graphite block mb-1">Сообщение / пожелания:</span>
                    {lead.message}
                  </div>
                )}

                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-sand/30">
                  {/* Quick communication */}
                  <div className="flex items-center gap-2">
                    <a
                      href={`https://wa.me/${waPhone}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-sans font-medium hover:bg-emerald-100 flex items-center gap-1.5"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                      Написать в WhatsApp
                    </a>
                    <a
                      href={`tel:${cleanPhone}`}
                      className="px-3 py-1.5 rounded-full bg-sand/30 text-graphite text-xs font-sans font-medium hover:bg-sand flex items-center gap-1.5"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      Позвонить
                    </a>
                  </div>

                  {/* Status changer & delete */}
                  <div className="flex items-center gap-3">
                    <select
                      value={lead.status}
                      onChange={(e) =>
                        handleStatusChange(lead.id, e.target.value as ContactRequestStatus)
                      }
                      className="px-3 py-1.5 rounded-xl border border-sand/60 font-sans text-xs bg-white focus:outline-none focus:border-olive"
                    >
                      <option value="new">Новая</option>
                      <option value="in_progress">В работе</option>
                      <option value="completed">Завершена</option>
                      <option value="archived">В архив</option>
                    </select>

                    <button
                      onClick={() => handleDelete(lead.id)}
                      className="p-1.5 rounded-lg text-graphite/40 hover:text-red-600 transition-colors"
                      title="Удалить заявку"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
