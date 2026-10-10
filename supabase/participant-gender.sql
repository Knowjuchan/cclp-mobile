alter table public.assessment_results add column if not exists gender text check (gender in ('남자', '여자'));
