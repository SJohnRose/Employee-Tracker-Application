-- update employee e set e.role_id=(select id from role r where r.title='Legal Team Lead') where e.first_name='Lynda' and e.last_name='Wilson';
-- select e.id, e.first_name, e.last_name, r.id from employee e, role r join e on e.role_id = r.id;
select e.id, first_name, last_name, title, d.name as department, salary, manager_id from employee e left join role on e.role_id = role.id left join department d on role.department_id = d.id;