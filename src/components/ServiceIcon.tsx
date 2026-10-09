import {
  BadgeCheck,
  Building2,
  CreditCard,
  Factory,
  FilePen,
  FileX2,
  Handshake,
  PenTool,
  ReceiptIndianRupee,
  Rocket,
  Ship,
  Store,
  UserRound,
  Users,
  UtensilsCrossed,
  FileText,
  type LucideIcon,
} from 'lucide-react';

const icons: Record<string, LucideIcon> = {
  BadgeCheck,
  Building2,
  CreditCard,
  Factory,
  FilePen,
  FileX2,
  Handshake,
  PenTool,
  ReceiptIndianRupee,
  Rocket,
  Ship,
  Store,
  UserRound,
  Users,
  UtensilsCrossed,
};

export function ServiceIcon({ name, className = '' }: { name: string; className?: string }) {
  const Icon = icons[name] ?? FileText;
  return <Icon className={className} strokeWidth={1.75} />;
}
