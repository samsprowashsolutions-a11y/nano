create table if not exists platform_jobs (
  id serial primary key,
  user_id text not null,
  client_name text not null,
  site text not null,
  product text,
  scope text,
  price text,
  crew text,
  scheduled_on text,
  status text not null default 'open',
  all_clear boolean not null default false,
  all_clear_by text,
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists tds_register (
  id serial primary key,
  user_id text not null,
  product text not null,
  kind text not null,
  version text not null,
  issued_on text,
  expires_on text,
  created_at timestamptz not null default now()
);

create table if not exists contractors (
  id serial primary key,
  user_id text not null,
  name text not null,
  abn text,
  insurance text,
  insurance_expires text,
  licences text,
  competency text,
  status text not null default 'active',
  created_at timestamptz not null default now()
);

create table if not exists academy_records (
  id serial primary key,
  user_id text not null,
  person text not null,
  course text not null,
  completed_on text,
  expires_on text,
  created_at timestamptz not null default now()
);

create table if not exists prestarts (
  id serial primary key,
  user_id text not null,
  job_ref text,
  site text not null,
  hazards text,
  ppe text,
  controls text,
  signed_by text,
  created_at timestamptz not null default now()
);

create table if not exists approvals (
  id serial primary key,
  user_id text not null,
  subject text not null,
  stage text not null,
  status text not null default 'pending',
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists bulletins (
  id serial primary key,
  user_id text not null,
  audience text not null,
  title text not null,
  body text not null,
  created_at timestamptz not null default now()
);

create table if not exists audit_events (
  id serial primary key,
  user_id text not null,
  actor text not null,
  action text not null,
  module text not null,
  detail text,
  created_at timestamptz not null default now()
);

create table if not exists generated_docs (
  id serial primary key,
  user_id text not null,
  kind text not null,
  title text not null,
  body text not null,
  created_at timestamptz not null default now()
);
