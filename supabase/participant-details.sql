-- Add participant identity fields without changing existing records or access policies.
alter table public.assessment_results add column if not exists birthday date;
alter table public.assessment_results add column if not exists phone_last4 text check (phone_last4 ~ '^[0-9]{4}$');
