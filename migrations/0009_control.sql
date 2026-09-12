create table if not exists vault_sequences (
  namespace text primary key,
  next_n integer not null default 1
);

create table if not exists vault_records (
  id serial primary key,
  user_id text not null,
  vault_ref text not null unique,
  namespace text not null,
  physical_ref text,
  category_ref text,
  entity_name text not null,
  source_status text not null default 'UNKNOWN',
  issue_status text not null default 'HOLD — MISSING EVIDENCE',
  security_class text not null default 'INTERNAL',
  lifecycle_state text not null default 'ACTIVE',
  control_event_state text not null default 'OPEN',
  n7_stage text,
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists n7_projects (
  id serial primary key,
  user_id text not null,
  vault_ref text not null,
  project_ref text not null,
  asset_ref text not null,
  client_name text not null,
  site text not null,
  surface text,
  current_stage text not null default 'INS',
  hold_open boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists n7_stage_events (
  id serial primary key,
  user_id text not null,
  project_id integer not null,
  stage text not null,
  owner_name text not null,
  payload jsonb not null default '{}'::jsonb,
  evidence_refs text,
  status text not null default 'open',
  hold_reason text,
  created_at timestamptz not null default now()
);

create table if not exists nanodata_records (
  id serial primary key,
  user_id text not null,
  vault_ref text not null,
  project_id integer not null,
  test_type text not null,
  operator text not null,
  raw_result text not null,
  n7_stage text not null default 'VER',
  review_state text not null default 'pending',
  issue_status text not null default 'HOLD — MISSING EVIDENCE',
  evidence_name text,
  evidence_data text,
  created_at timestamptz not null default now()
);

create table if not exists hold_events (
  id serial primary key,
  user_id text not null,
  vault_ref text not null,
  kind text not null,
  owner_name text not null,
  reason text not null,
  scope text,
  remediation text,
  authority text,
  status text not null default 'OPEN',
  related_record text,
  created_at timestamptz not null default now(),
  resolved_at timestamptz
);

create table if not exists evidence_items (
  id serial primary key,
  user_id text not null,
  vault_ref text not null,
  project_ref text,
  asset_ref text,
  n7_stage text,
  nanodata_test text,
  uploader text not null,
  source text not null default 'upload',
  evidence_type text not null,
  review_state text not null default 'pending',
  security_class text not null default 'INTERNAL',
  file_name text,
  file_data text,
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists ocr_intake (
  id serial primary key,
  user_id text not null,
  vault_ref text not null,
  use_case text not null,
  raw_text text,
  parsed jsonb,
  ocr_status text not null default 'captured',
  review_state text not null default 'pending',
  source_file text,
  created_at timestamptz not null default now()
);

create table if not exists job_readiness (
  id serial primary key,
  user_id text not null,
  job_id integer,
  project_id integer,
  category text not null,
  source_record text,
  review_state text not null default 'pending',
  owner_name text not null,
  result text not null default 'HOLD — COMPLIANCE GAP',
  created_at timestamptz not null default now()
);

insert into vault_sequences (namespace, next_n)
select ns, 1 from (
  values
    ('SP-DOC-'),('SP-AST-'),('SP-PRJ-'),('SP-PER-'),('SP-PRD-'),('SP-ACT-'),
    ('SP-AUD-'),('SP-INT-'),('SP-HLD-'),('SP-QTN-'),('SP-CHK-'),('SP-FIN-')
) as t(ns)
on conflict (namespace) do nothing;
