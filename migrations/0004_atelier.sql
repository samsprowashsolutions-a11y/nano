create table if not exists atelier_clients (
  id serial primary key,
  user_id text not null,
  name text not null,
  organisation text,
  email text,
  phone text,
  sector text,
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists client_documents (
  id serial primary key,
  user_id text not null,
  client_id integer not null,
  title text not null,
  kind text not null default 'file',
  file_name text,
  file_data text,
  created_at timestamptz not null default now()
);

create table if not exists warranties (
  id serial primary key,
  user_id text not null,
  client_id integer not null,
  product text not null,
  verify_id text,
  starts_on text not null,
  ends_on text not null,
  terms text,
  document_id integer,
  status text not null default 'active',
  created_at timestamptz not null default now()
);

create table if not exists vault_items (
  id serial primary key,
  user_id text not null,
  folder text not null,
  title text not null,
  period text,
  amount text,
  gst text,
  abn text,
  supplier text,
  notes text,
  file_name text,
  file_data text,
  created_at timestamptz not null default now()
);

create table if not exists qr_records (
  id serial primary key,
  user_id text not null,
  kind text not null,
  label text not null,
  payload text not null,
  created_at timestamptz not null default now()
);

create table if not exists ops_reports (
  id serial primary key,
  user_id text not null,
  report_date text not null,
  weather text,
  sites text,
  completed text,
  hazards text,
  body text not null,
  published_public boolean not null default false,
  published_atelier boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists site_posts (
  id serial primary key,
  user_id text not null,
  channel text not null,
  title text not null,
  body text not null,
  published boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists qa_jobs (
  id serial primary key,
  user_id text not null,
  client_name text not null,
  site text not null,
  product text not null,
  verify_id text,
  apa text not null default 'pending',
  rpt text not null default 'pending',
  dat text not null default 'pending',
  hlt text not null default 'pending',
  crt text not null default 'pending',
  dep text not null default 'pending',
  nia text not null default 'pending',
  notes text,
  created_at timestamptz not null default now()
);

create index if not exists atelier_clients_user_idx on atelier_clients (user_id);
create index if not exists vault_items_user_idx on vault_items (user_id, folder);
create index if not exists site_posts_pub_idx on site_posts (channel, published, created_at desc);
create index if not exists qa_jobs_user_idx on qa_jobs (user_id, created_at desc);
create index if not exists ops_reports_user_idx on ops_reports (user_id, report_date desc);
