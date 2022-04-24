-- UPDATE jq 
-- SET job_status='f'
-- WHERE job_id='be2b1fca515949e5d54fb22b8ed95575'
-- RETURNING *;

-- SELECT * from jq where updated_at > '2022-04-22T18:59:15.800Z';

-- select DISTINCT(job_status), count(*) from jq GROUP BY job_status;

-- SELECT job_status, count(*) AS "No." FROM jq GROUP BY job_status;

-- UPDATE jq SET job_status = c.job_status FROM (VALUES ('1c86df617d32b3493df723279db860fe', 'c'), ('2c46df617f63b3293df723279db860fe', 'c'), ('3c76df617d42b3293ff724279db860fe', 'c'), ('4c26df817d25b3283df723279db860fe', 'c')) AS c(job_id, job_status) WHERE c.job_id::uuid = jq.job_id RETURNING jq.job_id, jq.job_status;



/* md5 as uuid, https://dba.stackexchange.com/questions/115271/what-is-the-optimal-data-type-for-an-md5-field
better than bytea (https://stackoverflow.com/questions/15982737/postgresql-data-type-for-md5-message-digest)

  - job_status [status reserved keyword in mysql], TINYINT UNSIGNED, VARCHAR(N), ENUM (https://www.percona.com/blog/2008/08/09/picking-datatype-for-status-feilds/)
    -- add reference table for more information

  - adding automatic timestamps with psql (https://x-team.com/blog/automatic-timestamps-with-postgresql/)*
    different times in psql (https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-timestamp/)
    https://www.postgresql.org/docs/current/trigger-definition.html


  - queueing performance (https://gist.github.com/chanks/7585810)

*/