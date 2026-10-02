-- Run in the Supabase SQL editor. Anonymous users cannot read or write this table.
create table if not exists public.assessment_results (
 id uuid primary key default gen_random_uuid(),
 code_hash text unique not null check (length(code_hash)=64),
 name text not null check (char_length(name) between 1 and 40),
 answers jsonb not null check (jsonb_typeof(answers)='array' and jsonb_array_length(answers)=180),
 report jsonb not null,
 engine_version text not null,
 consent_version text not null,
 created_at timestamptz not null default now()
);
alter table public.assessment_results enable row level security;
revoke all on public.assessment_results from anon, authenticated;
grant select on public.assessment_results to authenticated;
grant all on public.assessment_results to service_role;
drop policy if exists "google administrator can read" on public.assessment_results;
create policy "google administrator can read" on public.assessment_results for select to authenticated using (
 lower(auth.jwt()->>'email')='shwncks15@gmail.com'
 and auth.jwt()->'app_metadata'->>'provider'='google'
);
create index if not exists assessment_results_created_at_idx on public.assessment_results(created_at desc,id desc);

-- Existing installations also need this column. accepted means the mail provider accepted the request, not confirmed delivery.
alter table public.assessment_results add column if not exists email_status text not null default 'pending';
