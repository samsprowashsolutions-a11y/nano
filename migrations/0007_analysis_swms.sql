alter table if exists analysis_requests add column if not exists site text;
alter table if exists analysis_requests add column if not exists swms jsonb;
