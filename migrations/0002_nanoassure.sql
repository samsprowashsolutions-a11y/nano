create table if not exists analysis_requests (
  id serial primary key,
  organisation text not null,
  contact_name text not null,
  email text not null,
  phone text,
  sector text not null,
  notes text,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

create table if not exists verify_records (
  id serial primary key,
  verify_id text not null unique,
  client_name text not null,
  site text not null,
  product text not null,
  issued_on text not null,
  status text not null default 'active',
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

create index if not exists analysis_requests_created_idx on analysis_requests (created_at desc);
create index if not exists verify_records_id_idx on verify_records (verify_id);
