drop schema if exists aki;
create schema aki;
use aki;
create table resume
(
    id   bigint       not null
        primary key,
    name varchar(255) not null,
    file mediumblob   not null
);

create table employee
(
    first_name     varchar(255) null,
    last_name      varchar(255) null,
    email          varchar(255) null,
    company_name   varchar(255) null,
    manager_id     bigint       null,
    position_title varchar(255) null,
    start_date     date         null,
    is_manager     tinyint(1)   null,
    password       varchar(255) null,
    resume_id      bigint       null,
    id             int auto_increment
        primary key,
    constraint FK_e7a2cbe5cb8a3776519a4e3a1e7
        foreign key (resume_id) references resume (id)
);

create index employee_resume_fk
    on employee (resume_id);

create table position
(
    id                  bigint               not null
        primary key,
    description         longtext             null,
    min_year_experience int                  null,
    salary              int                  null,
    is_posted           tinyint(1) default 0 null,
    title               varchar(255)         not null,
    employee_id         int                  null,
    constraint FK_847aa3a3601e72396a0fb03ef5c
        foreign key (employee_id) references employee (id)
);

create index position_employee_fk
    on position (employee_id);

create table referral
(
    id           bigint               not null
        primary key,
    resume_id    bigint               null,
    to_email     varchar(255)         not null,
    description  longtext             not null,
    referee_name varchar(255)         null,
    is_internal  tinyint(1) default 0 null,
    position_id  bigint               not null,
    employee_id  int                  not null,
    constraint FK_1a4879a67dd4aa7a281c454da5d
        foreign key (resume_id) references resume (id),
    constraint FK_753fbab8e209904c57c6b529ed5
        foreign key (employee_id) references employee (id),
    constraint FK_f9624dbcac1a80475b0690baa8d
        foreign key (position_id) references position (id)
);

create index referral_employee_fk
    on referral (employee_id);

create index referral_position_fk
    on referral (position_id);

create index referral_resume_fk
    on referral (resume_id);

create table tag
(
    id          bigint       not null
        primary key,
    name        varchar(255) not null,
    description text         null
);

create table position_tag
(
    id          bigint not null
        primary key,
    position_id bigint not null,
    tag_id      bigint not null,
    constraint FK_caa1d84e69741ee5540488b585a
        foreign key (tag_id) references tag (id),
    constraint FK_fc6ae90f4c851fed2eef08493ea
        foreign key (position_id) references position (id)
);

create index position_fk
    on position_tag (position_id);

create index tag_fk
    on position_tag (tag_id);

