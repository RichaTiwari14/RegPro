import React from 'react';
import {
  Building2,
  Scale,
  UserCheck,
  Users,
  Receipt,
  FileEdit,
  FileX,
  Award,
  Rocket,
  Globe,
  Utensils,
  Store,
  CreditCard,
  Key,
  ShieldCheck,
  HelpCircle,
} from 'lucide-react';

interface ServiceIconProps {
  name: string;
  className?: string;
}

export const ServiceIcon: React.FC<ServiceIconProps> = ({ name, className = 'w-5 h-5' }) => {
  switch (name) {
    case 'Building2':
      return <Building2 className={className} />;
    case 'Scale':
      return <Scale className={className} />;
    case 'UserCheck':
      return <UserCheck className={className} />;
    case 'Users':
      return <Users className={className} />;
    case 'Receipt':
      return <Receipt className={className} />;
    case 'FileEdit':
      return <FileEdit className={className} />;
    case 'FileX':
      return <FileX className={className} />;
    case 'Award':
      return <Award className={className} />;
    case 'Rocket':
      return <Rocket className={className} />;
    case 'Globe':
      return <Globe className={className} />;
    case 'Utensils':
      return <Utensils className={className} />;
    case 'Store':
      return <Store className={className} />;
    case 'CreditCard':
      return <CreditCard className={className} />;
    case 'Key':
      return <Key className={className} />;
    case 'ShieldCheck':
      return <ShieldCheck className={className} />;
    default:
      return <HelpCircle className={className} />;
  }
};

