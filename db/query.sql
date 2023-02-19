update employee e set e.role_id=(select id from role r where r.title='Legal Team Lead') where e.first_name='Lynda' and e.last_name='Wilson';
