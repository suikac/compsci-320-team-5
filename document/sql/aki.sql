# set up the aki data base
create table resume
(
    id   bigint       not null
        primary key,
    name varchar(255) not null,
    file mediumblob   not null
);

create table employee
(
    id             bigint       not null
        primary key,
    first_name     varchar(255) not null,
    last_name      varchar(255) not null,
    email          varchar(255) not null,
    company_name   varchar(255) not null,
    manager_id     bigint       not null,
    position_title varchar(255) not null,
    start_date     date         not null,
    is_manager     tinyint(1)   not null,
    password       varchar(255) not null,
    resume_id      bigint       null,
    constraint employee_resume_fk
        foreign key (resume_id) references resume (id)
);

create table position
(
    id                  bigint               not null
        primary key,
    description         longtext             null,
    min_year_experience int                  null,
    salary              int                  null,
    employee_id         bigint               null,
    is_posted           tinyint(1) default 0 null,
    column_7            int                  null,
    constraint position_employee_fk
        foreign key (employee_id) references employee (id)
);

create table referral
(
    id           bigint               not null
        primary key,
    employee_id  bigint               not null,
    resume_id    bigint               null,
    to_email     varchar(255)         not null,
    description  longtext             not null,
    referee_name varchar(255)         null,
    is_internal  tinyint(1) default 0 null,
    position_id  bigint               not null,
    constraint referral_employee_fk
        foreign key (employee_id) references employee (id),
    constraint referral_position_fk
        foreign key (position_id) references position (id),
    constraint referral_resume_fk
        foreign key (resume_id) references resume (id)
);

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
    constraint position_fk
        foreign key (position_id) references position (id),
    constraint tag_fk
        foreign key (tag_id) references tag (id)
);

