-- Null means no self-lookup view has been recorded since this feature was enabled.
alter table public.assessment_results add column if not exists last_self_viewed_at timestamptz;
comment on column public.assessment_results.last_self_viewed_at is 'Last successful identity-based result opening recorded by this app; not proof of the viewer identity. Historical views are not backfilled.';
