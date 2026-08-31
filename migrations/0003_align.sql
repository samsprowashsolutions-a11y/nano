alter table if exists analysis_requests add column if not exists organisation text;
alter table if exists analysis_requests add column if not exists contact_name text;
alter table if exists analysis_requests add column if not exists phone text;
alter table if exists analysis_requests add column if not exists sector text;
alter table if exists analysis_requests add column if not exists notes text;
alter table if exists analysis_requests add column if not exists status text;

create table if not exists verify_records (
  id serial primary key,
  verify_id text not null unique,
  client_name text not null,
  site text not null,
  product text not null,
  issued_on text not null,
  status text not null default 'valid',
  created_by text not null,
  created_at timestamptz not null default now()
);

create table if not exists field_tests (
  id serial primary key,
  site text not null,
  product text not null,
  adhesion boolean not null default false,
  beading boolean not null default false,
  uv boolean not null default false,
  antimicrobial boolean not null default false,
  durability boolean not null default false,
  completed_by text not null,
  initials text,
  notes text,
  created_at timestamptz not null default now()
);
