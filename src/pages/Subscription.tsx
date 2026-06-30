import { useState } from 'react';
import { Check, X, Sparkles, CreditCard, Calendar, Shield, ArrowRight } from 'lucide-react';
import Modal from '../components/Modal';
import { subscriptionPlans, currentUser } from '../data/dummyData';

interface SubscriptionProps {
  onToast: (type: 'success' | 'info' | 'ai', title: string, msg: string) => void;
}

export default function Subscription({ onToast }: SubscriptionProps) {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly');
  const [showUpgradeModal, setShowUpgradeModal] = useState<string | null>(null);
  const [showBillingModal, setShowBillingModal] = useState(false);

  const selectedPlan = subscriptionPlans.find(p => p.id === showUpgradeModal);

  return (
    <div className="space-y-6">
      <div className="animate-fade-in-up">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Subscription & Billing</h1>
        <p className="text-gray-500 mt-1">Manage your plan and payment methods</p>
      </div>

      <div className="bg-gradient-to-r from-primary-600 to-indigo-700 rounded-2xl p-6 text-white relative overflow-hidden animate-fade-in-up delay-100 cursor-pointer group" onClick={() => setShowBillingModal(true)}>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4 transition-transform duration-700 group-hover:scale-125" />
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Shield size={18} className="text-primary-200" />
              <span className="text-xs font-semibold text-primary-200 uppercase tracking-wider">Current Plan</span>
            </div>
            <h2 className="text-2xl font-bold mb-1 group-hover:tracking-wide transition-all">{currentUser.plan} Plan</h2>
            <p className="text-primary-200 text-sm">Active since {currentUser.joinDate} • Renews {currentUser.planExpiry}</p>
          </div>
          <button onClick={(e) => { e.stopPropagation(); setShowBillingModal(true); }}
            className="bg-white/15 px-4 py-2 rounded-xl text-sm font-medium hover:bg-white/25 transition-all clickable-sm flex items-center gap-1">
            <CreditCard size={14} /> Manage Billing
          </button>
        </div>
      </div>

      <div className="flex items-center justify-center gap-3 animate-fade-in-up delay-150">
        <span className={`text-sm font-medium cursor-pointer clickable-sm ${billingPeriod === 'monthly' ? 'text-gray-900' : 'text-gray-400'}`} onClick={() => setBillingPeriod('monthly')}>Monthly</span>
        <button onClick={() => setBillingPeriod(b => b === 'monthly' ? 'annual' : 'monthly')} className="relative w-14 h-7 bg-primary-100 rounded-full transition-colors clickable-sm hover:bg-primary-200">
          <div className={`absolute top-1 w-5 h-5 bg-primary-600 rounded-full transition-transform duration-300 ${billingPeriod === 'annual' ? 'translate-x-8' : 'translate-x-1'}`} />
        </button>
        <span className={`text-sm font-medium cursor-pointer clickable-sm ${billingPeriod === 'annual' ? 'text-gray-900' : 'text-gray-400'}`} onClick={() => setBillingPeriod('annual')}>
          Annual <span className="text-emerald-600 text-xs font-bold">Save 33%</span>
        </span>
      </div>

      <div className="grid md:grid-cols-3 gap-6 stagger-children">
        {subscriptionPlans.map((plan) => (
          <div key={plan.id} onClick={() => !plan.current && setShowUpgradeModal(plan.id)}
            className={`rounded-2xl border-2 p-6 relative card-hover ${plan.popular ? 'border-primary-500 shadow-lg shadow-primary-500/10' : 'border-gray-100'} ${!plan.current ? 'cursor-pointer' : ''}`}>
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary-600 to-primary-700 text-white text-xs font-bold px-4 py-1 rounded-full animate-pop-in">Most Popular</div>
            )}
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
              <div className="mt-2">
                <span className="text-4xl font-black text-gray-900">${billingPeriod === 'annual' && plan.annualPrice ? plan.annualPrice : plan.price}</span>
                {plan.price > 0 && <span className="text-gray-400 text-sm">{plan.period}</span>}
              </div>
              {billingPeriod === 'annual' && plan.annualPrice && (
                <p className="text-xs text-emerald-600 mt-1 font-medium animate-fade-in">Save ${((plan.price - plan.annualPrice) * 12).toFixed(0)}/year</p>
              )}
            </div>
            <ul className="space-y-3 mb-6">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm clickable-sm hover:text-primary-700 transition-colors">
                  <Check size={16} className="text-emerald-500 mt-0.5 shrink-0" /><span className="text-gray-600">{f}</span>
                </li>
              ))}
              {plan.limitations.map((l) => (
                <li key={l} className="flex items-start gap-2 text-sm">
                  <X size={16} className="text-gray-300 mt-0.5 shrink-0" /><span className="text-gray-400">{l}</span>
                </li>
              ))}
            </ul>
            <button onClick={(e) => { e.stopPropagation(); if (!plan.current) setShowUpgradeModal(plan.id); else onToast('info', 'Current Plan', 'You\'re already on this plan'); }}
              className={`w-full py-3 rounded-xl text-sm font-semibold transition-all ${plan.current ? 'bg-gray-100 text-gray-500' : plan.popular ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white btn-bounce ripple-container' : 'bg-gray-900 text-white btn-bounce ripple-container'}`}>
              {plan.current ? 'Current Plan ✓' : `Upgrade to ${plan.name}`}
            </button>
          </div>
        ))}
      </div>

      {/* Payment History */}
      <div className="bg-white rounded-2xl border border-gray-100 animate-fade-in-up delay-300">
        <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900 cursor-pointer hover:text-primary-700 transition-colors clickable-sm" onClick={() => onToast('info', 'Payment History', '4 payments recorded')}>Payment History</h2>
          <button onClick={() => onToast('success', 'Download Started', 'Generating invoice PDF...')} className="text-sm text-primary-600 font-medium clickable-sm hover:text-primary-700">Download All</button>
        </div>
        <div className="divide-y divide-gray-50">
          {[
            { date: 'Jul 15, 2025', amount: '$14.99', plan: 'Pro Monthly' },
            { date: 'Jun 15, 2025', amount: '$14.99', plan: 'Pro Monthly' },
            { date: 'May 15, 2025', amount: '$14.99', plan: 'Pro Monthly' },
            { date: 'Apr 15, 2025', amount: '$14.99', plan: 'Pro Monthly' },
          ].map((p, i) => (
            <div key={i} onClick={() => onToast('info', 'Invoice', `${p.plan} — ${p.amount} on ${p.date}`)} className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-all cursor-pointer clickable-sm">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center transition-transform hover:scale-110"><Calendar size={16} /></div>
                <div><p className="text-sm font-medium text-gray-900">{p.plan}</p><p className="text-xs text-gray-400">{p.date}</p></div>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-900">{p.amount}</p>
                <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-bold">Paid</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 animate-fade-in-up delay-400 card-hover cursor-pointer" onClick={() => onToast('info', 'Enterprise', 'Our sales team will reach out!')}>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center transition-transform hover:scale-110 hover:rotate-6"><Sparkles size={22} className="text-white" /></div>
          <div><h3 className="text-lg font-bold text-gray-900">Need a custom plan?</h3><p className="text-sm text-gray-500">Contact us for enterprise pricing</p></div>
        </div>
        <button onClick={(e) => { e.stopPropagation(); onToast('success', 'Message Sent', 'Our team will contact you soon!'); }}
          className="flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-xl font-semibold text-sm btn-bounce ripple-container">
          Contact Sales <ArrowRight size={16} />
        </button>
      </div>

      {/* Upgrade Modal */}
      <Modal isOpen={!!showUpgradeModal} onClose={() => setShowUpgradeModal(null)} title={`Upgrade to ${selectedPlan?.name}`} size="sm">
        {selectedPlan && (
          <div className="space-y-4 animate-fade-in-up text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center mx-auto animate-pop-in"><Sparkles size={28} className="text-white" /></div>
            <p className="text-3xl font-black text-gray-900">${billingPeriod === 'annual' && selectedPlan.annualPrice ? selectedPlan.annualPrice : selectedPlan.price}<span className="text-sm text-gray-400">{selectedPlan.period}</span></p>
            <ul className="text-left space-y-2">{selectedPlan.features.map(f => (<li key={f} className="flex items-center gap-2 text-sm text-gray-600"><Check size={14} className="text-emerald-500" />{f}</li>))}</ul>
            <button onClick={() => { setShowUpgradeModal(null); onToast('success', 'Upgrade Successful! 🎉', `Welcome to ${selectedPlan.name} plan!`); }}
              className="w-full py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl font-semibold text-sm btn-bounce ripple-container">Confirm Upgrade →</button>
          </div>
        )}
      </Modal>

      <Modal isOpen={showBillingModal} onClose={() => setShowBillingModal(false)} title="Billing Details" size="sm">
        <div className="space-y-4 animate-fade-in-up">
          {[{ label: 'Payment Method', value: '•••• •••• •••• 4242', sub: 'Visa' }, { label: 'Next Billing', value: currentUser.planExpiry, sub: '$14.99' }, { label: 'Billing Address', value: 'San Francisco, CA', sub: 'United States' }].map(item => (
            <div key={item.label} className="p-4 bg-gray-50 rounded-xl clickable-sm hover:bg-primary-50 transition-all cursor-pointer" onClick={() => onToast('info', item.label, `${item.value}`)}>
              <p className="text-xs text-gray-400">{item.label}</p>
              <p className="text-sm font-semibold text-gray-900">{item.value}</p>
              <p className="text-xs text-gray-500">{item.sub}</p>
            </div>
          ))}
          <button onClick={() => { setShowBillingModal(false); onToast('success', 'Updated', 'Billing info saved'); }}
            className="w-full py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl font-semibold text-sm btn-bounce ripple-container">Update Billing</button>
        </div>
      </Modal>
    </div>
  );
}
