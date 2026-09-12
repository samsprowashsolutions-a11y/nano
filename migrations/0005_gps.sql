create table if not exists gps_fences (
  id serial primary key,
  user_id text not null,
  label text not null default 'Office',
  address text not null,
  lat double precision not null,
  lng double precision not null,
  radius_m integer not null default 150,
  start_hour integer not null default 9,
  end_hour integer not null default 15,
  created_at timestamptz not null default now()
);

create table if not exists gps_sessions (
  id serial primary key,
  user_id text not null,
  person text not null,
  mode text not null,
  site text,
  started_at timestamptz not null default now(),
  paid_from timestamptz not null default now(),
  ended_at timestamptz,
  start_lat double precision,
  start_lng double precision,
  start_accuracy double precision,
  inside_fence boolean not null default false,
  hours numeric,
  notes text
);

create table if not exists gps_pings (
  id serial primary key,
  user_id text not null,
  session_id integer not null,
  lat double precision not null,
  lng double precision not null,
  accuracy double precision,
  inside_fence boolean not null default false,
  recorded_at timestamptz not null default now()
);

create index if not exists gps_sessions_live_idx on gps_sessions (user_id, ended_at);
create index if not exists gps_pings_session_idx on gps_pings (session_id, recorded_at desc);
