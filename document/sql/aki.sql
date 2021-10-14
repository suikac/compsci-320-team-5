drop schema if exists aki;
create schema aki;
use aki;
create table employee
(
    first_name varchar(255) null,
    last_name varchar(255) not null,
    email varchar(255) null,
    company_name varchar(255) not null,
    manager_id bigint not null,
    position_title varchar(255) null,
    start_date date null,
    is_manager tinyint(1) null,
    password varchar(255) null,
    resume_id int null,
    id int auto_increment
        primary key,
    company_id int not null
);

create index employee_resume_fk
    on employee (resume_id);

create table position
(
    description longtext null,
    min_year_experience int null,
    salary int null,
    is_posted tinyint(1) default 0 null,
    title varchar(255) not null,
    manager_id int null,
    id int auto_increment
        primary key,
    constraint FK_59d4badb979f73316f8e0a08a02
        foreign key (manager_id) references employee (id)
);

create index position_employee_fk
    on position (manager_id);

create table resume
(
    name varchar(255) not null,
    file mediumblob not null,
    id int auto_increment
        primary key
);

create table referral
(
    description longtext not null,
    referee_name varchar(255) null,
    is_internal tinyint(1) default 0 null,
    position_id int not null,
    resume_id int null,
    id int auto_increment
        primary key,
    referee_email varchar(255) not null,
    referee_id int null,
    referrer_id int not null,
    constraint FK_1a4879a67dd4aa7a281c454da5d
        foreign key (resume_id) references resume (id),
    constraint FK_3ebf676e9613646800e3749ce65
        foreign key (referee_id) references employee (id),
    constraint FK_f9624dbcac1a80475b0690baa8d
        foreign key (position_id) references position (id)
);

create index referee_employee_fk
    on referral (referee_id);

create index referral_employee_fk
    on referral (referrer_id);

create index referral_position_fk
    on referral (position_id);

create index referral_resume_fk
    on referral (resume_id);

create table tag
(
    name varchar(255) not null,
    description text null,
    id int auto_increment
        primary key
);

create table position_tag
(
    id int auto_increment
        primary key,
    position_id int not null,
    tag_id int not null,
    constraint FK_caa1d84e69741ee5540488b585a
        foreign key (tag_id) references tag (id),
    constraint FK_fc6ae90f4c851fed2eef08493ea
        foreign key (position_id) references position (id)
);

create index position_fk
    on position_tag (position_id);

create index tag_fk
    on position_tag (tag_id);
