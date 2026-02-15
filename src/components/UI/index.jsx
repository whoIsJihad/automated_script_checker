import React from 'react';

/**
 * Card component - base container for all major content blocks
 * Modern SaaS aesthetic with depth and subtle interactions
 */
export const Card = ({ children, className = '', hover = false, onClick, ...props }) => {
  const cardProps = {
    className: `bg-white border border-slate-200 rounded-xl shadow-sm transition-all duration-200 ${
      hover || onClick ? 'hover:shadow-md hover:border-slate-300 cursor-pointer' : ''
    } ${className}`,
    ...props
  };
  
  if (onClick) {
    cardProps.onClick = onClick;
  }
  
  return <div {...cardProps}>{children}</div>;
};

/**
 * Button component with multiple variants
 * SaaS-style with smooth interactions and depth
 */
export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  loading = false,
  ...props
}) => {
  const baseStyles = 'font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl';

  const variants = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:shadow-sm',
    secondary: 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:-translate-y-0.5 hover:shadow-sm border border-slate-200 active:translate-y-0',
    danger: 'bg-red-50 text-red-700 hover:bg-red-100 hover:-translate-y-0.5 hover:shadow-md border border-red-200 active:translate-y-0',
    ghost: 'text-slate-600 hover:bg-slate-50 hover:-translate-y-0.5 border border-transparent',
  };

  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={loading}
      {...props}
    >
      {loading ? '...' : children}
    </button>
  );
};

/**
 * Modern pill-style badges with vibrant colors
 */
export const Badge = ({ children, variant = 'neutral' }) => {
  const variants = {
    neutral: 'bg-slate-100 text-slate-700',
    primary: 'bg-indigo-100 text-indigo-700',
    success: 'bg-green-100 text-green-700 border border-green-200',
    warning: 'bg-amber-100 text-amber-700 border border-amber-200',
    danger: 'bg-red-100 text-red-700 border border-red-200',
  };

  return <span className={`px-3 py-1.5 rounded-full text-xs font-semibold border border-transparent ${variants[variant]}`}>{children}</span>;
};

/**
 * Empty state component
 */
export const EmptyState = ({ icon: Icon, title, description, action }) => (
  <div className="text-center py-12">
    {Icon && <Icon size={48} className="mx-auto text-slate-300 mb-4" />}
    <h3 className="text-lg font-semibold text-slate-900 mb-2">{title}</h3>
    {description && <p className="text-slate-500 mb-6">{description}</p>}
    {action && action}
  </div>
);

/**
 * Loading skeleton
 */
export const Skeleton = ({ className = '' }) => (
  <div className={`bg-gradient-to-r from-slate-200 to-slate-100 animate-pulse rounded-lg ${className}`} />
);

/**
 * Section header
 */
export const SectionHeader = ({ title, description, action }) => (
  <div className="flex items-start justify-between mb-6">
    <div>
      <h2 className="text-2xl font-bold text-slate-900 mb-1">{title}</h2>
      {description && <p className="text-slate-500 text-sm">{description}</p>}
    </div>
    {action && <div className="flex-shrink-0">{action}</div>}
  </div>
);

/**
 * Premium input field with modern SaaS styling
 * Premium feel with proper height and rounded corners
 */
export const Input = ({ label, error, icon: Icon, ...props }) => (
  <div className="flex flex-col space-y-2">
    {label && <label className="text-sm font-semibold text-slate-700">{label}</label>}
    <div className="relative">
      {Icon && <Icon size={18} className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none" />}
      <input
        {...props}
        className={`w-full h-11 px-4 ${Icon ? 'pl-11' : ''} bg-slate-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:bg-white transition-all duration-200 ${
          error ? 'border-red-500' : 'border-slate-200'
        }`}
      />
    </div>
    {error && <span className="text-xs text-red-600 font-medium">{error}</span>}
  </div>
);

/**
 * Premium select field with modern SaaS styling
 * Matches input field aesthetic
 */
export const Select = ({ label, options = [], error, icon: Icon, ...props }) => (
  <div className="flex flex-col space-y-2">
    {label && <label className="text-sm font-semibold text-slate-700">{label}</label>}
    <div className="relative">
      {Icon && <Icon size={18} className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none z-10" />}
      <select
        {...props}
        className={`w-full h-11 px-4 ${Icon ? 'pl-11' : ''} bg-slate-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:bg-white transition-all duration-200 appearance-none ${
          error ? 'border-red-500' : 'border-slate-200'
        }`}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <div className="absolute right-3.5 top-1/2 transform -translate-y-1/2 pointer-events-none">
        <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>
    {error && <span className="text-xs text-red-600 font-medium">{error}</span>}
  </div>
);

/**
 * Modal component
 */
export const Modal = ({ open, onClose, title, children, actions }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full shadow-xl">
        <div className="p-6">
          {title && <h2 className="text-xl font-bold text-slate-900 mb-4">{title}</h2>}
          {children}
        </div>
        {actions && (
          <div className="flex justify-end gap-3 p-6 border-t border-slate-200">
            {actions}
          </div>
        )}
      </Card>
    </div>
  );
};

/**
 * Stat card for dashboards
 */
export const StatCard = ({ label, value, change, icon: Icon, color = 'indigo' }) => {
  const colors = {
    indigo: 'bg-indigo-50 text-indigo-600 border-indigo-200',
    emerald: 'bg-emerald-50 text-emerald-600 border-emerald-200',
    amber: 'bg-amber-50 text-amber-600 border-amber-200',
    rose: 'bg-rose-50 text-rose-600 border-rose-200',
  };

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500 font-medium mb-1">{label}</p>
          <p className="text-3xl font-bold text-slate-900">{value}</p>
          {change && (
            <p className={`text-xs mt-2 ${change > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
              {change > 0 ? '+' : ''}{change}% from last month
            </p>
          )}
        </div>
        {Icon && (
          <div className={`p-3 rounded-lg border ${colors[color]}`}>
            <Icon size={24} />
          </div>
        )}
      </div>
    </Card>
  );
};
